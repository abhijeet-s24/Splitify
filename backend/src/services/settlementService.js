const GroupMember = require("../models/GroupMember");
const Expense = require("../models/Expense");

/**
 * Greedy algorithm to minimise the number of settlement transactions.
 *
 * Steps:
 *  1. Fetch all members + all expenses for the group.
 *  2. Compute net balance per user:
 *       netBalance[user] = totalPaid – equalShareOwed
 *  3. Separate into creditors (balance > 0) and debtors (balance < 0).
 *  4. Greedily match debtors to creditors to produce minimum transactions.
 *
 * Returns:
 *  {
 *    balances   : [{ userId, name, email, netBalance }],
 *    settlements: [{ from: {id, name}, to: {id, name}, amount }],
 *    totalExpenses: Number
 *  }
 */
const computeSettlements = async (groupId) => {
  // ── 1. Fetch members ──────────────────────────────────────
  const memberships = await GroupMember.find({ group: groupId }).populate(
    "user",
    "name email"
  );

  if (memberships.length === 0) {
    return { balances: [], settlements: [], totalExpenses: 0 };
  }

  const memberCount = memberships.length;

  // Build a lookup map:  userId(string) → { id, name, email }
  const memberMap = {};
  memberships.forEach(({ user }) => {
    memberMap[user._id.toString()] = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  });

  // ── 2. Fetch all expenses ─────────────────────────────────
  const expenses = await Expense.find({ group: groupId });

  // Initialise balances to 0
  const balanceMap = {}; // userId(string) → netBalance (number)
  Object.keys(memberMap).forEach((uid) => (balanceMap[uid] = 0));

  let totalExpenses = 0;

  // ── 3. Compute net balances ───────────────────────────────
  expenses.forEach(({ paidBy, amount }) => {
    const payerId = paidBy.toString();
    const equalShare = amount / memberCount;
    totalExpenses += amount;

    // Payer is credited the full amount
    balanceMap[payerId] = (balanceMap[payerId] || 0) + amount;

    // Every member (including payer) owes an equal share
    Object.keys(memberMap).forEach((uid) => {
      balanceMap[uid] = (balanceMap[uid] || 0) - equalShare;
    });
  });

  // Round to 2 decimal places to avoid floating‑point noise
  const round = (n) => Math.round(n * 100) / 100;
  Object.keys(balanceMap).forEach((uid) => {
    balanceMap[uid] = round(balanceMap[uid]);
  });

  // Build balances array for the response
  const balances = Object.entries(balanceMap).map(([uid, netBalance]) => ({
    userId: memberMap[uid].id,
    name: memberMap[uid].name,
    email: memberMap[uid].email,
    netBalance,
  }));

  // ── 4. Greedy settlement optimisation ────────────────────
  // creditors: netBalance > 0 (others owe them)
  // debtors  : netBalance < 0 (they owe others)
  const creditors = balances
    .filter((b) => b.netBalance > 0)
    .map((b) => ({ ...b })); // shallow copy so we can mutate amount

  const debtors = balances
    .filter((b) => b.netBalance < 0)
    .map((b) => ({ ...b, netBalance: Math.abs(b.netBalance) }));

  const settlements = [];

  let ci = 0; // creditor pointer
  let di = 0; // debtor pointer

  while (ci < creditors.length && di < debtors.length) {
    const credit = creditors[ci];
    const debt = debtors[di];

    const settle = round(Math.min(credit.netBalance, debt.netBalance));

    settlements.push({
      from: { id: debt.userId, name: debt.name },
      to: { id: credit.userId, name: credit.name },
      amount: settle,
    });

    credit.netBalance = round(credit.netBalance - settle);
    debt.netBalance = round(debt.netBalance - settle);

    if (credit.netBalance === 0) ci++;
    if (debt.netBalance === 0) di++;
  }

  return {
    balances,
    settlements,
    totalExpenses: round(totalExpenses),
  };
};

module.exports = { computeSettlements };

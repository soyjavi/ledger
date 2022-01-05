export const getProgressionPercentage = (currentBalance = 0, progression = 0) => {
  const percentage = currentBalance - progression > 0 ? (progression * 100) / (currentBalance - progression) : 0;

  return percentage < 0.009 ? (percentage < 0 ? -0.01 : 0.01) : percentage;
};

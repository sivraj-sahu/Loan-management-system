export const runBREChecks = ({
  dob,
  monthlySalary,
  panNumber,
  employmentType,
}: {
  dob: string;
  monthlySalary: number;
  panNumber: string;
  employmentType: string;
}) => {
  const today = new Date();

  const birthDate = new Date(dob);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference =
    today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 23 || age > 50) {
    return {
      success: false,
      message: "Age must be between 23 and 50",
    };
  }

  if (monthlySalary < 25000) {
    return {
      success: false,
      message: "Salary must be at least 25000",
    };
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(panNumber)) {
    return {
      success: false,
      message: "Invalid PAN format",
    };
  }

  if (employmentType === "UNEMPLOYED") {
    return {
      success: false,
      message: "Unemployed applicants are not eligible",
    };
  }

  return {
    success: true,
  };
};
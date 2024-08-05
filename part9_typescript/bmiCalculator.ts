const calculateBmi = (height: number, weight: number) : string => {
    const bmi = weight / (height/100^2)
    switch(true) {
        case bmi<18.5:
            return 'Underweight';
        case bmi>18.5 && bmi<24.9:
            return 'Normal (healthy weight)';
        case bmi>25 && bmi<29.9:
            return 'Overweight';
        case bmi>=30:
            return 'Obesity';
        default:
            throw new Error('Error');
    }
}

console.log(calculateBmi(180, 74))

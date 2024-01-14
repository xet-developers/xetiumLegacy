export class Validator {
    static validateUserName(userName) {
        const reg = new RegExp("^([A-Za-z]{5,20})$")
        return reg.test(userName)
    }

    static validateEmail(email) {
        const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return reg.test(email)
    }

    static validatePassword(password) {
        const reg = /^(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)[\w$#%&!?.-]+$/;
        return reg.test(password)
    }

    static validateRepeatPassword(password, repeatPassword) {
        return password === repeatPassword
    }

    static validateNameProject(projectName) {
        const reg = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9_ ]{1,30}$/
        return reg.test(projectName)
    }

    static validateUrlProject(projectUrl) {
        const reg = /(https?:\/\/(?:www\d*\.|(?!www\d*\.))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\d*\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\d*\.|(?!www\d*\.))[a-zA-Z0-9]+\.[^\s]{2,}|www\d*\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        return reg.test(projectUrl)
    }

    static validateDescProject(projectDesc) {
        return projectDesc >= 0 && projectDesc <= 150
    }

    static validateStartDate(startDate) {
        return startDate <= this.getNowDate();
    }

    static getNowDate(){
        function join(date, options, separator) {
            function format(option) {
                let formatter = new Intl.DateTimeFormat('en', option);
                return formatter.format(date);
            }
            return options.map(format).join(separator);
        }

        let options = [{year: 'numeric'}, {month: '2-digit'}, {day: 'numeric'}];
        return  join(new Date(), options, '-');
    }

    static validateEndDate(startDate, endDate) {
        return endDate <= this.getNowDate() && endDate >= startDate;
    }

    static validateInputValue(inputValue) {
        let value;
        if (inputValue.length === 0) value = 0
        else value = inputValue.split(', ').length
        return value >= 1 && value <= 15;
    }

    static validateInputValueClustering(inputValue) {
        let value;
        if (inputValue.length === 0) {
            value = 0
        }

        else {
            value = inputValue.split(', ').length
        }

        return value >= 4 && value <= 15;
    }
}
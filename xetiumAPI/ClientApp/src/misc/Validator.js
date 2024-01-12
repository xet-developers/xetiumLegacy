export class Validator {
    validateUserName(userName) {
        const reg = new RegExp("^([A-Za-z]{5,20})$")
        return reg.test(userName)
    }

    validateEmail(email) {
        const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return reg.test(email)
    }

    validatePassword(password) {
        const reg = /^(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)[\w$#%&!?.-]+$/;
        return reg.test(password)
    }

    validateRepeatPassword(password, repeatPassword) {
        return password === repeatPassword
    }

    validateCheckboxData(checkboxData) {
        return checkboxData;
    }

    validateCheckboxConf(checkboxConf) {
        return checkboxConf;
    }

    validateNameProject(projectName) {
        const reg = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9_ ]{1,30}$/
        return reg.test(projectName)
    }

    validateUrlProject(projectUrl) {
        const reg = /(https?:\/\/(?:www\d*\.|(?!www\d*\.))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\d*\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\d*\.|(?!www\d*\.))[a-zA-Z0-9]+\.[^\s]{2,}|www\d*\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        return reg.test(projectUrl)
    }

    validateDescProject(projectDesc) {
        return projectDesc >= 0 && projectDesc <= 150
    }

    validateStartDate(startDate) {
        function join(date, options, separator) {
            function format(option) {
               let formatter = new Intl.DateTimeFormat('en', option);
               return formatter.format(date);
            }
            return options.map(format).join(separator);
         }
         
        let options = [{year: 'numeric'}, {month: '2-digit'}, {day: 'numeric'}];
        let nowDate = join(new Date(), options, '-');

        return startDate <= nowDate;
    }

    validateEndDate(startDate, endDate) {
        function join(date, options, separator) {
            function format(option) {
               let formatter = new Intl.DateTimeFormat('en', option);
               return formatter.format(date);
            }
            return options.map(format).join(separator);
         }
         
        let options = [{year: 'numeric'}, {month: '2-digit'}, {day: 'numeric'}];
        let nowDate = join(new Date(), options, '-');

        return endDate <= nowDate && endDate >= startDate;
    }

    validateInputValue(inputValue) {
        let value;
        if (inputValue.length === 0) value = 0
        else value = inputValue.split(', ').length
        return value >= 1 && value <= 15;
    }

    validateInputValueClastering(inputValue) {
        let value;
        if (inputValue.length === 0) value = 0
        else value = inputValue.split(', ').length
        return value >= 4 && value <= 15;
    }
}
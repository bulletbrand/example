const validatePassword = async (rule, value) => {
    const passwordRegexp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/;
    if (!passwordRegexp.test(String(value).toLowerCase())) {
        return Promise.reject('Invalid password format.Password must' +
            'contain numbers and letters and be at least 8 characters')
    }
    Promise.resolve(value);
};

const validateEmail = async (rule, value) => {
    const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (!emailRegexp.test(String(value).toLowerCase())) {
        return Promise.reject('Invalid email format')
    }
    Promise.resolve(value);
};

export {validatePassword, validateEmail}
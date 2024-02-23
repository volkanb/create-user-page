export const validFullName = new RegExp(
    '^[a-zA-Z ]+$'
);

export const validPhone = new RegExp(
    '^\\d{10}$'
);

export const validEmail = new RegExp(
    '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
);

export const validPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8}$'
);
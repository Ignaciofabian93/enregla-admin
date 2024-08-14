export const validate_email = (data: string) =>
  data.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data);

export const validate_password = (data: string) => data.length > 0 && !/^[A-Z0-9]{4,}$/i.test(data);

export const validate_phone = (data: string) => data.length > 0 && !/^\+[0-9]{2,3}[0-9]{9,10}$/i.test(data);

export const validate_username = (data: string) => data.length > 0 && !/^[A-Z]{3,}$/i.test(data);

export const validate_rut = (data: string) => data.length > 0 && !/^[0-9]{7,8}-[0-9]{1}$/i.test(data);

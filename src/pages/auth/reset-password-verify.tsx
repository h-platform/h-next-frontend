import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from '../../components/Card';
import { command } from '../../services/cq.service';

interface IFormInput {
    token: string;
    password: string;
    password2: string;
}

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء الحصول علي بيانات الطلب';
};

export default function register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { otpUuid, mobileNumber } = router.query;

    const onSubmit: SubmitHandler<IFormInput> = async ({ token }) => {
        try {
            setIsLoading(true);
            const commandResponse = await command('umm', 'user.resetPasswordByMobileNo.checkOtp', { token, otpUuid, mobileNumber });
            router.push(`/auth/login?mobileNumber=${mobileNumber}`)
            window.alert('تم التحقق من رقم الموبايل بنجاح ، يمكن تسجيل الدخول الان ...');
        } catch (err) {
            console.log('some error occured during registration', err)
            window.alert(handleError(err));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="card-title text-center">رمز التحقق</h2>

                <hr className="my-3" />

                {/* mobile number field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">رقم الموبايل:</span>
                    </label>
                    <input value={mobileNumber} type="text" placeholder="" className="input input-sm input-bordered" disabled />
                </div>

                {/* token field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">رقم التحقق:</span>
                    </label>
                    <input {...register("token", { required: true, minLength: 6, maxLength: 6 })} type="text" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-base-content text-justify text-opacity-40">تأكد من ادخال رمز التحقق من 6 ارقام</p>
                    {errors.token && errors.token.type == 'required' && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                    {errors.token && errors.token.type == 'minLength' && <p className="text-red-400 text-justify">رمز التحقق من 6 ارقام</p>}
                    {errors.token && errors.token.type == 'maxLength' && <p className="text-red-400 text-justify">رمز التحقق من 6 ارقام</p>}
                </div>


                {/* password */}
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">كلمة مرور:</span>
                    </label>
                    <input {...register("password", { required: true, minLength: 8 })} name="password" type="password" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-base-content text-justify text-opacity-40">لابد ان تكون من 8 حروف وتشمل ارقام وعلامات</p>
                    {errors.password && errors.password.type === 'required' && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                    {errors.password && errors.password.type === 'minLength' && <p className="text-red-400 text-justify">كلمة المرور لابد من ان تتكون من 8 خانات</p>}
                </div>

                {/* confirm password */}
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">تكرار كلمة مرور:</span>
                    </label>
                    <input {...register("password2", { required: true, minLength: 8 })} name="password2" type="password" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-base-content text-justify text-opacity-40">اعد كتابة كلمة المرور مرة اخري</p>
                    {errors.password2 && errors.password2.type === 'required' && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                    {errors.password2 && errors.password2.type === 'minLength' && <p className="text-red-400 text-justify">كلمة المرور لابد من ان تتكون من 8 خانات</p>}
                </div>

                {/* verify button */}
                <hr className="my-3" />
                <div className="mt-2">
                    <button type="submit" className="w-full btn btn-primary btn-sm">ارسال</button>
                </div>

            </form>
            <div>
                {/* home link */}
                <hr className="my-3" />
                <div className='text-center'>
                    <Link href='/'>
                        <a className="link link-primary">
                            صفحة البداية
                        </a>
                    </Link>
                </div>
            </div>
        </Card>
    )
}
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from '../../components/Card';
import { BASE_URL, command } from '../../services/cq.service';

interface IFormInput {
    displayName: string;
    mobileNumber: string;
    password: string;
    password2: string;
    captcha: string;
}

const newRecord: IFormInput = {
    displayName: '',
    mobileNumber: '249',
    password: '',
    password2: '',
    captcha: '',
}

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء الحصول علي بيانات الطلب';
};

export default function register() {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormInput>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const [refreshNo, setRefreshNo] = useState(0);

    useEffect(() => {
        reset({ ...newRecord });
    }, [])

    const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
        try {
            setIsLoading(true);
            const commandResponse = await command('umm', 'user.registerByMobileNo.sendOtp', formData);
            router.push(`/auth/register-verify?otpUuid=${commandResponse.data.otpUuid}&mobileNumber=${formData.mobileNumber}`)
        } catch (err) {
            console.log('some error occured during registration', err)
            window.alert(handleError(err));
            setRefreshNo(refreshNo + 1);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            {/* form */}
            <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="card-title text-center">تسجيل حساب</h2>
                <hr />

                {/* name field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">الاسم رباعي:</span>
                    </label>
                    <input {...register("displayName", { required: true })} type="text" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-base-content text-justify text-opacity-40">تأكد من ادخال الاسم كاملا رباعي</p>
                    {errors.displayName && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                </div>

                {/* mobile number */}
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">رقم الموبايل:</span>
                    </label>
                    <input {...register("mobileNumber", { required: true, pattern: /249[19]\d{8,8}/ })} name="mobileNumber" type="number" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-base-content text-justify text-opacity-40">سيتم ارسال رمز التحقق إلي رقم الموبايل الخاص بك عبر رسالة نصية</p>
                    {errors.mobileNumber && errors.mobileNumber?.type == "required" && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                    {errors.mobileNumber && errors.mobileNumber?.type == "pattern" && <p className="text-red-400 text-justify">رقم الموبايل لابد ان يبدأ ب 249 ومن ثم 9 خانات</p>}
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

                {/* captcha number */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">رمز التحقق <a className="link" href='' onClick={(e) => { e.preventDefault(); setRefreshNo(refreshNo + 1) }}>(تحديث)</a>:</span>
                    </label>
                    <img className="w-44" src={`${BASE_URL}/captcha/commands/user.createCaptcha?resource=user-register&refreshNo=${refreshNo}`} />
                    <input {...register("captcha", { required: true })} type="text" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-base-content text-justify text-opacity-40">أدخل رمز التحقق بحيث يكون مطابق مع الصورة</p>
                    {errors.captcha && errors.captcha?.type == "required" && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                </div>


                {/* actions */}
                <button type="submit" className="btn btn-primary btn-xs">ارسال</button>
                <hr />
                <Link href='/auth/login'>
                    <a className="btn btn-xs bg-gray-500">
                        تسجيل الدخول
                    </a>
                </Link>
                <Link href='/auth/reset-password'>
                    <a className="btn btn-xs bg-gray-500">
                        إعادة ضبط كلمة المرور
                    </a>
                </Link>
                <Link href='/'>
                    <a className="btn btn-xs bg-gray-500">
                        صفحة البداية
                    </a>
                </Link>
            </form>
        </Card>
    )
}


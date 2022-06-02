import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../../common/auth';
import { Card } from '../../components/Card';
import { BASE_URL, command } from '../../services/cq.service';

interface IFormInput {
    mobileNumber: string;
    nationalNumber: string;
    captcha: string;
}

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء تسجيل الدخول';
};

export default function signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [refreshNo, setRefreshNo] = useState(0);

    const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
        try {
            setIsLoading(true);
            const commandResponse = await command('umm', 'user.resetPasswordByMobileNo.sendOtp', formData);
            window.alert('تم ارسال رسالة نصية في رقم الهاتف الجوال');
            router.push(`/auth/reset-password-verify?otpUuid=${commandResponse.data.otpUuid}&mobileNumber=${formData.mobileNumber}`)
        } catch (err) {
            console.log('some error occured during registration', err)
            window.alert(handleError(err));
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Card>
            <form className='flex flex-col gap-1' onSubmit={handleSubmit(onSubmit)}>
                <h2 className="card-title text-center">إعادة ضبط كلمة المرور</h2>

                {/* mobile */}
                <hr />
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">رقم الموبايل:</span>
                    </label>
                    <input {...register("mobileNumber", { required: true, pattern: /249[19]\d{8,8}/ })} type="text" placeholder="مثلا 249912340000" className="input input-sm input-bordered" />
                    <p className="text-right text-base-content text-opacity-40">سيتم ارسال رمز التحقق إلي رقم الموبايل الخاص بك عبر رسالة نصية</p>
                    {errors.mobileNumber && errors.mobileNumber?.type == "required" && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                    {errors.mobileNumber && errors.mobileNumber?.type == "pattern" && <p className="text-red-400 text-justify">رقم الموبايل لابد ان يبدأ ب 249 ومن ثم 9 خانات</p>}
                </div>

                {/* national number */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">الرقم الوطني:</span>
                    </label>
                    <input {...register("nationalNumber", { required: true, pattern: /\d{11,11}/ })} type="nationalNumber" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-base-content text-justify text-opacity-40">الرقم الوطني بالارقام الانجليزية مكون من 11 رقم</p>
                    {errors.nationalNumber && errors.nationalNumber?.type == "required" && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                    {errors.nationalNumber && errors.nationalNumber?.type == "pattern" && <p className="text-red-400 text-justify">هذا الحقل لابد ان يكون من 12 خانة</p>}
                </div>

                {/* captcha number */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">رمز التحقق:</span>
                    </label>
                    <img className="w-44" src={`${BASE_URL}/captcha/commands/user.createCaptcha?resource=reset-password`} />
                    <input {...register("captcha", { required: true })} type="text" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-base-content text-justify text-opacity-40">أدخل رمز التحقق بحيث يكون مطابق مع الصورة</p>
                    {errors.captcha && errors.captcha?.type == "required" && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                </div>

                {/* login action */}
                <button className="btn btn-primary btn-xs">إعادة الضبط</button>
                <hr />
                <Link href='/auth/register'>
                    <a className="btn btn-xs bg-gray-500">
                        تسجيل حساب
                    </a>
                </Link>
                <Link href='/auth/login'>
                    <a className="btn btn-xs bg-gray-500">
                        تسجيل الدخول
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


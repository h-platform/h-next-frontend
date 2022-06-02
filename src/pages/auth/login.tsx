import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../../common/auth';
import { Card } from '../../components/Card';
import { command } from '../../services/cq.service';

interface IFormInput {
    mobileNumber: string;
    password: string;
}

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء تسجيل الدخول';
};

export default function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const auth = useContext(AuthContext);

    const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
        try {
            setIsLoading(true);
            const commandResponse = await command('auth', 'auth.loginByMobileNumber', formData);
            auth.setContext({
                ...auth,
                user: commandResponse.data.user,
                isAuthenticated: true,
            });
            window.localStorage.setItem('token', commandResponse.data.token)
            window.alert('تم تسجيل الدخول بنجاح');
            router.push(`/`)
        } catch (err) {
            console.log('some error occured during registration', err)
            window.alert(handleError(err));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
                <h2 className="card-title text-center">تسجيل الدخول</h2>
                <hr className="" />

                {/* mobile */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">رقم الموبايل:</span>
                    </label>
                    <input {...register("mobileNumber", { required: true, pattern: /249[19]\d{8,8}/ })} type="text" placeholder="" className="input input-sm input-bordered" />
                    <p className="text-right text-base-content text-opacity-40">يبدأ ب 249 ومن ثم 9 ارقام</p>
                    {errors.mobileNumber && errors.mobileNumber?.type == "pattern" && <p className="text-red-400 text-justify">هذا الحقل لابد ان يكون من 12 خانة</p>}
                </div>

                {/* password */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">كلمة المرور:</span>
                    </label>
                    <input {...register("password", { required: true })} type="password" placeholder="" className="input input-sm input-bordered" />
                    {errors.password && errors.password?.type == "pattern" && <p className="text-red-400 text-justify">هذا الحقل لابد ان يكون من 12 خانة</p>}
                </div>

                {/* actions */}
                <div className="">
                    <button className="w-full btn btn-primary btn-sm">تسجيل الدخول</button>
                </div>
                <hr className="" />
                <Link href='/auth/register' >
                    <a className="btn btn-primary btn-xs bg-gray-400">
                        تسجيل حساب جديد
                    </a>
                </Link>
                <Link href='/auth/reset-password'>
                    <a className="btn btn-primary btn-xs bg-gray-400">
                        إعادة ضبط كلمة المرور
                    </a>
                </Link>
                <Link href='/'>
                    <a className="btn btn-primary btn-xs bg-gray-400">
                        صفحة البداية
                    </a>
                </Link>
            </form>
        </Card>
    )
}


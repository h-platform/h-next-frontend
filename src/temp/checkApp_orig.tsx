import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { command } from '../services/cq.service';
const axios = require('axios').default;

interface IFormInput {
    appNo: string;
    captcha: string;
}

type AppInfo = {
    GENERAL_STATE: string;
    GENERAL_STATE_PRINTED: boolean;
    APP_APPLICATIONNUMBER: string;
    APP_STATE: string;
    APP_PLACEOFDELIVERY: string;
    DOC_DOCUMENTNUMBER: string;
    DOC_DATEOFISSUE: string;
    DOC_STATE: string;
    ARABIC_FIRST_NAME: string;
    ARABIC_SECOND_NAME: string;
    ARABIC_THIRD_NAME: string;
    ARABIC_FOURTH_NAME: string;
    SHOW_NAME: boolean;
    CODE: number;
}

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء الحصول علي بيانات الطلب';
};

const checkAppPage: NextPage = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormInput>();
    const [refreshNo, setRefreshNo] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
        const appNo = formData.appNo;
        setIsLoading(true);
        setAppInfo(null);

        if (typeof appNo == 'string' && appNo.length != 12) {
            setIsError(true);
            setErrorMsg('رقم الطلب لا بد ان يكون من 12 رقم')
            return;
        }

        try {
            const commandResponse = await command('ask', 'app.checkApp', { appNo });
            setIsError(false);
            setErrorMsg('');
            setAppInfo(commandResponse.data.application);
        } catch (err) {
            setIsError(true);
            setErrorMsg(handleError(err));
            console.log('error during fetching data', err);
        } finally {
            reset({ appNo: '', captcha: '' });
            setIsLoading(false);
            setRefreshNo(refreshNo + 1);
        }
    }

    return (
        <>
            <div className="w-full card shadow-lg compact bg-base-100">
                <figure>
                    <img src="header.jpg" />
                </figure>
                <div className="card-body">
                    <div className="p-1">
                        <div className='flex justify-between'>
                            <h2 className="block text-lg leading-tight font-medium text-black">الاستعلام عن حالة الطلب</h2>
                            {/* <a href='/auth/register' className='link link-primary'>تسجيل حساب</a> */}
                        </div>

                        <hr className="my-3" />
                        <p className="mt-2 text-gray-500">يمكنك عبر هذه الخدمة الاستعلام عن حالة الطلب ، يرجي إدخال رقم الطلب المكون من 12 رقم</p>

                        <hr className="my-3" />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* appNo number */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">رقم الطلب:</span>
                                </label>
                                <input {...register("appNo", { required: true, pattern: /\d{12,12}/ })} type="number" placeholder="مثال 123400001245" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
                                {errors.appNo && errors.appNo?.type == "required" && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                                {errors.appNo && errors.appNo?.type == "pattern" && <p className="text-red-400 text-justify">هذا الحقل لابد ان يكون من 12 خانة</p>}
                                {isError && <p className="text-red-400">{errorMsg}</p>}
                            </div>

                            {/* captcha number */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">رمز التحقق:</span>
                                </label>
                                <img className="w-44" src={`/api/auth/commands/user.captcha?resource=check-app&refreshNo=${refreshNo}`} />
                                <input {...register("captcha", { required: true })} type="text" placeholder="" className="input input-sm input-bordered" />
                                <p className="text-base-content text-justify text-opacity-40">أدخل رمز التحقق بحيث يكون مطابق مع الصورة</p>
                                {errors.captcha && errors.captcha?.type == "required" && <p className="text-red-400 text-justify">هذا الحقل مطلوب</p>}
                            </div>

                            <div className="mt-3">
                                <button type="submit" className="w-full btn btn-primary btn-sm">
                                    {!loading && <>بحث</>}
                                    {loading && <>جاري البحث ...</>}
                                </button>
                            </div>
                        </form>

                        <hr className="my-3" />
                        {appInfo && <div className="grid grid-cols-12 gap-2">
                            <div className="py-1 px-3 col-span-12">
                                <h2 className="block py-2 text-lg leading-tight font-medium text-black">بيانات الطلب:</h2>
                                <hr className="my-0" />
                            </div>

                            <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">رقم الطلب</div>
                            <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                                {appInfo?.APP_APPLICATIONNUMBER}
                            </div>

                            {appInfo?.SHOW_NAME && <>
                                <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">الاسم</div>
                                <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6 overflow-auto">
                                    {appInfo?.ARABIC_FIRST_NAME}
                                    &nbsp;
                                    {appInfo?.ARABIC_SECOND_NAME}
                                    &nbsp;
                                    {appInfo?.ARABIC_THIRD_NAME}
                                    &nbsp;
                                    {appInfo?.ARABIC_FOURTH_NAME}
                                </div>
                            </>}

                            <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">حالة الطلب</div>
                            <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                                <span className='text-xs text-gray'>{appInfo?.GENERAL_STATE}</span>
                            </div>

                            <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">المجمع</div>
                            <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">{appInfo?.APP_PLACEOFDELIVERY}</div>

                            {appInfo.GENERAL_STATE_PRINTED && <>
                                <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">رقم الجواز</div>
                                <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">{appInfo?.DOC_DOCUMENTNUMBER}</div>

                                <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">تاريخ الإصدار</div>
                                <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">{appInfo?.DOC_DATEOFISSUE.substring(0, 10)}</div>
                            </>}
                        </div>}

                        <div className="text-center mt-4">
                            <Link href='/'>
                                <a className="link link-primary">
                                    صفحة البداية
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-6'>
                <span className='text-xs text-gray-400'>{appInfo?.CODE}</span>
            </div>
        </>
    );
};

export default checkAppPage;

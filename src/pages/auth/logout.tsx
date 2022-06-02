import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../../common/auth';
import { Card } from '../../components/Card';
import { command } from '../../services/cq.service';

interface IFormInput {
    mobileNumber: string;
    password: string;
}

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء الحصول علي بيانات الطلب';
};

export default function Logout() {
    const auth = useContext(AuthContext);

    useEffect(() => {
        auth.setContext({
            ...auth,
            user: null,
            isAuthenticated: false,
            isLoading: false,
        })
        window.localStorage.removeItem('token');
        window.alert('تم تسجيل الخروج بنجاح');
    }, [])


    return (
        <Card>
            <div className='flex flex-col gap-2'>

                <h2 className="card-title">تسجيل الخروج</h2>
                <hr />
            </div>

            <p>تم تسجيل الخروج بنجاح</p>

            <hr />
            <div>
                <Link href='/'>
                    <a className="btn btn-xs bg-gray-500">
                        صفحة البداية
                    </a>
                </Link>
            </div>
        </Card>
    )
}


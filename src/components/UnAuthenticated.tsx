import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthInterface, AuthContext } from '../common/auth';

export const UnAuthenticated = () => {
  return (
    <>
      <div className="w-full card shadow-lg compact bg-base-100">
        <figure>
          <img src="/header.jpg" />
        </figure>
        <div className="card-body">

          <div className='my-16'>

            <p className='text-center'>
            الرجاء تسجيل  الدخول:
            </p>
            <div className='flex justify-center'>
              <hr />
              <Link href='/auth/login'>
                <a className='w-full md:w-1/2 btn-sm mt-2 btn btn-primary'>
                  تسجيل دخول
                </a>
              </Link>
            </div>

            <br />
            <p className='text-center'>
            او إنشاء حساب جديد:
            </p>
            <div className='flex justify-center'>
              <Link href='/auth/register'>
                <a className='w-full md:w-1/2 btn btn-primary btn-sm mt-2'>
                  تسجيل حساب جديد
                </a>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

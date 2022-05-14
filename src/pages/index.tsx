import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthInterface, AuthContext } from '../common/auth';

const Home: NextPage = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <div className="w-full card shadow-lg compact bg-base-100">
        <figure>
          <img src="/header.jpg" />
        </figure>
        <div className="card-body my-16">

          {auth.isAuthenticated && <div>
            <div className='flex justify-center'>
              <Link href='/ask/checkApp'>
                <a className='w-full md:w-1/2 btn-sm mt-2 btn btn-primary'>
                  استعلام عن حالة طلب
                </a>
              </Link>
            </div>
            <div className='flex justify-center mt-4'>
              <Link href='/auth/logout'>
                <a className='w-full md:w-1/2 btn btn-primary btn-sm mt-2'>
                  تسجيل الخروج
                </a>
              </Link>
            </div>
          </div>}

          {!auth.isAuthenticated && <div>
            <div className='flex justify-center'>
              <Link href='/auth/login'>
                <a className='w-full md:w-1/2 btn-sm mt-2 btn btn-primary'>
                  تسجيل دخول
                </a>
              </Link>
            </div>
            <div className='flex justify-center mt-4'>
              <Link href='/auth/register'>
                <a className='w-full md:w-1/2 btn btn-primary btn-sm mt-2'>
                  تسجيل حساب جديد
                </a>
              </Link>
            </div>
            <div className='flex justify-center mt-4'>
              <Link href='/auth/reset-password'>
                <a className='w-full md:w-1/2 btn btn-primary btn-sm mt-2'>
                  إعادة ضبط كلمة المرور
                </a>
              </Link>
            </div>
          </div>}

        </div>
      </div>
    </>
  );
};

export default Home;

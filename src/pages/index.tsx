import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthInterface, AuthContext } from '../common/auth';
import { Card } from '../components/Card';

const Home: NextPage = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Card>
        {auth.isAuthenticated && (auth.user.roles||[]).includes('PROVIDER') && <div>
          <span className='text-xs text-gray-500'>Provider:</span>
          <div className='flex flex-col gap-2'>
            <Link href='/provider/claim-list'>
              <a className='w-full btn btn-primary btn-sm'>
                Claim List
              </a>
            </Link>
            <Link href='/provider/search-member'>
              <a className='w-full btn btn-primary btn-sm'>
                Search Member
              </a>
            </Link>
          </div>
        </div>}

        {auth.isAuthenticated && (auth.user.roles||[]).includes('TPA') && <div>
          <span className='text-xs text-gray-500'>TPA:</span>
          <div className='flex flex-col gap-2'>
            <Link href='/tpa/providers-contracts-list'>
              <a className='w-full btn btn-primary btn-sm'>
                Providers Contracts List
              </a>
            </Link>
            <Link href='/tpa/clients-contracts-list'>
              <a className='w-full btn btn-primary btn-sm'>
                Clients Contracts List
              </a>
            </Link>
            {/* <Link href='/provider/search-member'>
              <a className='w-full btn btn-primary btn-sm'>
                Claim List
              </a>
            </Link>
            <Link href='/provider/search-member'>
              <a className='w-full btn btn-primary btn-sm'>
                Search Member
              </a>
            </Link> */}
          </div>
        </div>}

        {auth.isAuthenticated && <div>
          <span className='text-xs text-gray-500'>Logout</span>
          <div className='flex flex-col gap-2 mt-2'>
            <Link href='/auth/logout'>
              <a className='w-full btn btn-primary btn-sm'>
                Logout
              </a>
            </Link>
          </div>
        </div>}

        {!auth.isAuthenticated && <div>
          <div className='flex justify-center'>
            <Link href='/auth/login'>
              <a className='w-full md:w-1/2 btn-sm mt-2 btn btn-primary'>
                Login
              </a>
            </Link>
          </div>
          <div className='flex justify-center mt-4'>
            <Link href='/auth/register'>
              <a className='w-full md:w-1/2 btn btn-primary btn-sm mt-2'>
                Register
              </a>
            </Link>
          </div>
          <div className='flex justify-center mt-4'>
            <Link href='/auth/reset-password'>
              <a className='w-full md:w-1/2 btn btn-primary btn-sm mt-2'>
                Reset Password
              </a>
            </Link>
          </div>
        </div>}
      </Card>
    </>
  );
};

export default Home;

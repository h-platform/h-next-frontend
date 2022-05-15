import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '../../components/Card';
import { EnsureAuthorized } from '../../components/EnsureAuthorized';
import { command, query } from '../../services/cq.service';
import { ClientContractMember } from '../../models/member';
import { useRouter } from 'next/router';

interface IFormInput {
    memberNo: string;
    tpaId: number;
}

const handleError = (err: any) => {
    return err.message || 'Error during request';
};

const checkAppPage: NextPage = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormInput>();
    const [refreshNo, setRefreshNo] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [tpas, setTpas] = useState<any[]>([]);
    const [memberInfo, setMemberInfo] = useState<ClientContractMember | null>(null);
    const router = useRouter();

    const loadData = useCallback(
        async () => {
            const memberRes = await query('provider-gw', 'member.findByMemberId', { memberId: router.query.memberId });
            // setTpas(tpasRes)
            setMemberInfo(memberRes);
        },
        [],
    );

    useEffect(() => {
        loadData();
    }, [])

    const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
        setIsLoading(true);
        setMemberInfo(null);

        try {
            setIsError(false);
            setErrorMsg('');

        } catch (err) {
            setIsError(true);
            window.alert(handleError(err));
            console.log('error during fetching data', err);
        } finally {
            reset({ memberNo: '', tpaId: 0 });
            setIsLoading(false);
            setRefreshNo(refreshNo + 1);
        }
    }

    return (
        <>
            <EnsureAuthorized>
                <Card>

                    {/* member info */}
                    {memberInfo && <div className="grid grid-cols-12 gap-2">
                        <div className="py-1 px-3 col-span-12">
                            <h2 className="block py-2 text-lg leading-tight font-medium text-black">Create Claim:</h2>
                            <hr className="my-0" />
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Member No</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{memberInfo?.memberNo}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Client Name</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            {memberInfo?.contract?.client?.clientCode}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Full Name</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            {memberInfo?.fullName}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Class</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6 overflow-auto">
                            {memberInfo?.serviceClass}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Job</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{memberInfo?.jobTitle}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Gender</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{memberInfo?.gender}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">DOB</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{memberInfo?.birthDate}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Status</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{memberInfo?.status}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Relation</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">{memberInfo?.relation}</div>

                        {/* form */}
                        <form onSubmit={handleSubmit(onSubmit)}  className="py-1 px-3 col-span-12 font-medium">
                            {/* visit date\ */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Visit Date:</span>
                                </label>
                                <input type="text" value={new Date().toISOString().substring(0,10)} placeholder="" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
                            </div>

                            {/* doctor name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Doctor Name:</span>
                                </label>
                                <input {...register("memberNo", { required: true, pattern: /\d{7,7}/ })} type="text" placeholder="" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
                            </div>

                            {/* doctor name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Deprtment:</span>
                                </label>
                                <input {...register("memberNo", { required: true, pattern: /\d{7,7}/ })} type="text" placeholder="" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
                            </div>

                            {/* doctor name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Diagnostic:</span>
                                </label>
                                <input {...register("memberNo", { required: true, pattern: /\d{7,7}/ })} type="text" placeholder="" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
                            </div>

                            {isError && <p className="text-red-400">{errorMsg}</p>}

                            <div className="mt-3">
                                <button type="submit" className="w-full btn btn-primary btn-sm">
                                    {!loading && <>Create Claim</>}
                                    {loading && <>Creating ...</>}
                                </button>
                            </div>
                        </form>
                    </div>}

                    {/* links */}
                    <hr className="my-3" />
                    <div className="text-center">
                        <Link href='/'>
                            <a className="w-full btn btn-primary btn-sm bg-gray-500">
                                Home Page
                            </a>
                        </Link>
                    </div>
                </Card>
            </EnsureAuthorized>
        </>
    );
};

export default checkAppPage;

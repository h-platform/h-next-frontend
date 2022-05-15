import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '../../components/Card';
import { EnsureAuthorized } from '../../components/EnsureAuthorized';
import { command, query } from '../../services/cq.service';
import { ClientContractMember } from '../../models/client-contract-member.entity';
import { useRouter } from 'next/router';

interface IFormInput {
    doctorName: string;
    department: string;
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
        try {
            setIsLoading(true);
            setIsError(false);
            setErrorMsg('');
            const { data } = await command('provider-gw', 'claim.create', {
                memberId: memberInfo?.id,
                doctorName: formData.doctorName,
                department: formData.department,
            });
            router.push(`/provider/claim-detail?claimId=${data.savedRecord.id}`)
        } catch (err) {
            setIsError(true);
            window.alert(handleError(err));
            console.log('error during fetching data', err);
        } finally {
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


                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">TPA Name</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            {memberInfo?.contract?.tpa?.contact.contactNameEn}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Insuerance Company</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            {memberInfo?.contract?.insurer?.contact.contactNameEn}
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
                        <form onSubmit={handleSubmit(onSubmit)} className="py-1 px-3 col-span-12 font-medium">
                            {/* visit date\ */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Visit Date:</span>
                                </label>
                                <input type="text" disabled value={new Date().toISOString().substring(0, 10)} placeholder="" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
                            </div>

                            {/* doctor name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Doctor Name:</span>
                                </label>
                                <input {...register("doctorName", { required: true })} type="text" placeholder="" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
                            </div>

                            {/* doctor name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Deprtment:</span>
                                </label>
                                <input {...register("department", { required: true })} type="text" placeholder="" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
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

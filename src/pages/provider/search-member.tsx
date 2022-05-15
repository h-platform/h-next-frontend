import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '../../components/Card';
import { EnsureAuthorized } from '../../components/EnsureAuthorized';
import { command, query } from '../../services/cq.service';
import { ClientContractMember } from '../../models/client-contract-member.entity';

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

    const loadData = useCallback(
        async () => {
            const tpasRes = await query('provider-gw', 'tpa.findMyTpas', {});
            setTpas(tpasRes)
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
            const res = await query('provider-gw', 'member.findByMemberNo', formData);
            setIsError(false);
            setErrorMsg('');
            setMemberInfo(res);
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

                    {/* form */}
                    {!memberInfo && <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="block text-lg leading-tight font-medium text-black">Search Member</h2>
                        <hr className="my-3" />

                        {/* appNo number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Member No:</span>
                            </label>
                            <input {...register("memberNo", { required: true, pattern: /\d{7,7}/ })} type="number" placeholder="0000125" className={`input input-sm input input-bordered ${isError && "border-red-400"}`} />
                            {errors.memberNo && errors.memberNo?.type == "required" && <p className="text-red-400 text-justify">This field is required</p>}
                            {errors.memberNo && errors.memberNo?.type == "pattern" && <p className="text-red-400 text-justify">Member No must be 7 digits</p>}
                        </div>

                        {/* appNo number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">TPA:</span>
                            </label>
                            <select {...register("tpaId", { required: true })} className={`input input-sm input input-bordered ${isError && "border-red-400"}`}>
                                {tpas.map((tpa) => <option value={tpa.id}>{tpa.tpaCode}</option>)}
                            </select>
                            {errors.tpaId && errors.tpaId?.type == "required" && <p className="text-red-400 text-justify">This field is required</p>}
                        </div>

                        {isError && <p className="text-red-400">{errorMsg}</p>}

                        <div className="mt-3">
                            <button type="submit" className="w-full btn btn-primary btn-sm">
                                {!loading && <>Search</>}
                                {loading && <>Searching ...</>}
                            </button>
                        </div>
                    </form>}

                    {/* home page */}
                    {memberInfo && <div className="grid grid-cols-12 gap-2">
                        <div className="py-1 px-3 col-span-12">
                            <h2 className="block py-2 text-lg leading-tight font-medium text-black">Member Info:</h2>
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
                            {memberInfo?.contract?.client?.contact.contactNameEn}
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

                        <div className="py-1 px-3 col-span-12">
                            <Link href={`/provider/create-claim?memberId=${memberInfo?.id}`}>
                                <a className="w-full btn btn-primary btn-sm" >
                                    Create Claim
                                </a>
                            </Link>
                        </div>

                        <div className="py-1 px-3 col-span-12">
                            <button type="submit" className="w-full btn btn-primary btn-sm" onClick={() => { setMemberInfo(null); }}>
                                Search Another Member
                            </button>
                        </div>
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

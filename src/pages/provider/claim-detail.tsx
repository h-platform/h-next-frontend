import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '../../components/Card';
import { EnsureAuthorized } from '../../components/EnsureAuthorized';
import { command, query } from '../../services/cq.service';
import { useRouter } from 'next/router';
import { Claim } from '../../models/claim.entity';

interface IFormInput {
    memberNo: string;
    tpaId: number;
}

const handleError = (err: any) => {
    return err.message || 'Error during request';
};

const ClaimDetailPage: NextPage = () => {
    const [claim, setClaim] = useState<Claim | null>(null);
    const router = useRouter();

    const loadData = useCallback(
        async () => {
            const { data: claimData } = await query('provider-gw', 'claim.findById', { id: router.query.claimId });
            setClaim(claimData.row);
        },
        [router.query.claimId],
    );

    useEffect(() => {
        loadData();
    }, [router.query.claimId]);

    return (
        <>
            <EnsureAuthorized>
                <Card>

                    {/* claim info */}
                    <h2 className="block text-lg leading-tight font-medium text-black">Claim Details</h2>
                    <hr className="my-3" />

                    {/* claim info */}
                    {claim && <div className="grid grid-cols-12 gap-2">
                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Member No</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{claim?.member.id}</span>
                        </div>


                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">TPA Name</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            {claim?.member.contract.tpa.contact.contactNameEn}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Insuerance Company</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            {claim?.member?.contract?.insurer?.contact.contactNameEn}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Client Name</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            {claim?.member.contract.client.contact.contactNameEn}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Full Name</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            {claim?.member.fullName}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Class</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6 overflow-auto">
                            {claim?.member.serviceClass}
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Gender</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{claim?.member.gender}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">DOB</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{claim?.member.birthDate}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">id</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{claim?.id}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Visit Date</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{claim?.visitDate}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Claim Status</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{claim?.status}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Department</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{claim?.department}</span>
                        </div>

                        <div className="bg-gray-300 py-1 px-3 col-span-12 md:col-span-6 font-medium">Doctor Name</div>
                        <div className="bg-gray-100 py-1 px-3 col-span-12 md:col-span-6">
                            <span className='text-xs text-gray'>{claim?.doctorName}</span>
                        </div>

                    </div>}

                    {/* links */}
                    <hr className="my-3" />
                    <div className="text-center">
                        <Link href={`/api/provider-gw/queries/claim.getReport.pdf?id=${claim.id}&authorization=${window.localStorage.getItem('token')}`}>
                            <button className='btn btn-primary btn-xs'>Print Claim</button>
                        </Link>
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

export default ClaimDetailPage;

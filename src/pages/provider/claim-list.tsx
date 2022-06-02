import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { formatDate } from '../../common/util';
import { Card } from '../../components/Card';
import { EnsureAuthorized } from '../../components/EnsureAuthorized';
import { Claim } from '../../models/claim.entity';
import { command, query } from '../../services/cq.service';

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء الحصول علي بيانات الطلب';
};

const checkAppPage: NextPage = () => {
    const [claims, setClaims] = useState<Claim[]>([]);

    const findData = useCallback(
        async () => {
            const response = await query('provider-gw', 'claim.findAll', {});
            setClaims(response.data.rows);
        },
        [],
    )

    useEffect(() => {
        findData();
    }, [])

    return (
        <>
            <EnsureAuthorized>
                <Card>
                    <div className='flex flex-col gap-2'>
                        {claims.map(claim => <>
                            <div className='grid grid-cols-2 gap-1 bg-slate-100'>
                                <div className='col-span-2'>
                                    <b>#{claim.id} - {claim.member.fullName}</b>
                                </div>
                                <div className='col-span-2'>
                                    <span className='text-xs text-gray-400'>company Name:</span>
                                    {claim.member.contract.client.contact.contactNameAr}
                                </div>
                                <div className='col-span-2'>
                                    <span className='text-xs text-gray-400'>Insurance Name:</span>
                                    {claim.member.contract.insurer.contact.contactNameAr}
                                </div>
                                <div>
                                    <span className='text-xs text-gray-400'>memberNo:</span> {claim.member.memberNo}
                                </div>
                                <div>
                                    <span className='text-xs text-gray-400'>class / benefit:</span> {claim.member.serviceClass} / {claim.member.benefit}
                                </div>
                                <div>
                                    <span className='text-xs text-gray-400'>birthDate:</span>
                                    {formatDate(claim.member.birthDate as unknown as string)}
                                </div>
                                <div>
                                    <span className='text-xs text-gray-400'>visitDate:</span>
                                    {formatDate(claim.visitDate as unknown as string)}
                                </div>
                                <div>
                                    <span className='text-xs text-gray-400'>doctor:</span>
                                    {claim.doctorName}
                                </div>
                                <div>
                                    <span className='text-xs text-gray-400'>department:</span>
                                    {claim.department}
                                </div>
                                <div className='col-span-2'>
                                    <hr />
                                </div>
                                <div className='col-span-2 flex justify-even gap-4 border-x-2'>
                                    <Link href={`/provider/claim-detail?claimId=${claim.id}`}>
                                        <button className='btn btn-primary btn-xs'>View Details</button>
                                    </Link>
                                    <Link href={`/api/provider-gw/queries/claim.getReport.pdf?id=${claim.id}&authorization=${window.localStorage.getItem('token')}`}>
                                        <button className='btn btn-primary btn-xs'>Print Claim</button>
                                    </Link>
                                </div>
                                <div className='col-span-2'>
                                    <hr />
                                </div>
                            </div>
                        </>)}
                    </div>
                    {/* links */}
                    <hr className="my-3" />
                    <div className="text-center">
                        <Link href='/'>
                            <a className="w-full btn btn-primary btn-sm bg-gray-500">
                                صفحة البداية
                            </a>
                        </Link>
                    </div>
                </Card>
            </EnsureAuthorized>
        </>
    );
};

export default checkAppPage;

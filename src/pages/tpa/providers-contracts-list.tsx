import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { formatDate } from '../../common/util';
import { Card } from '../../components/Card';
import { EnsureAuthorized } from '../../components/EnsureAuthorized';
import { Claim } from '../../models/claim.entity';
import { ClientContract } from '../../models/provider-contract.entity';
import { command, query } from '../../services/cq.service';

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء الحصول علي بيانات الطلب';
};

const checkAppPage: NextPage = () => {
    const [providerContracts, setProviderContracts] = useState<ClientContract[]>([]);

    const setProvderContractTpaStatus = useCallback(
        async (providerContractId: number, accepted: boolean) => {
            await command('tpa-gw', 'providerContract.setAccpetedByTpa', { providerContractId, accepted });
            await findData();
            alert('Contract updated successfully');
        },
        [],
    );

    const findData = useCallback(
        async () => {
            const rows = await query('tpa-gw', 'providerContract.findAll', {});
            setProviderContracts(rows);
        },
        [],
    );

    useEffect(() => {
        findData();
    }, [])

    return (
        <>
            <EnsureAuthorized>
                <Card>
                    <h1 className='text-xl'>Providers List</h1>
                    <hr />
                    <div className='flex flex-col gap-2'>
                        {providerContracts.map(providerContract => <>
                            <div className='grid grid-cols-2 gap-1 bg-gray-100'>
                                <div className='col-span-2'>
                                    <b>{providerContract.provider.contact.contactNameEn}</b>
                                </div>
                                <div className=''>
                                    <span className='text-xs text-gray-500'>Privder Name:</span>
                                    {providerContract.provider.providerType}
                                </div>
                                <div className=''>
                                    <span className='text-xs text-gray-500'>Network:</span>
                                    {JSON.stringify(providerContract.serviceClasses)}
                                </div>
                                <div className=''>
                                    <span className='text-xs text-gray-500'>Provider Accepted:</span>
                                    {JSON.stringify(providerContract.acceptedByProvider)}
                                </div>
                                <div className=''>
                                    <span className='text-xs text-gray-500'>TPA Accepted:</span>
                                    {JSON.stringify(providerContract.acceptedByTpa)} <button className='btn btn-primary btn-xs' onClick={() => setProvderContractTpaStatus(providerContract.id, !providerContract.acceptedByTpa)}>Toggle</button>
                                </div>
                                <div className=''>
                                </div>
                                <div className='col-span-2 flex justify-even gap-4 border-x-2'>
                                    {/* <Link href={`/provider/claim-detail?claimId=${claim.id}`}>
                                        <button className='btn btn-primary btn-xs'>View Details</button>
                                    </Link>
                                    <Link href={`/api/provider-gw/queries/claim.getReport.pdf?id=${claim.id}&authorization=${window.localStorage.getItem('token')}`}>
                                        <button className='btn btn-primary btn-xs'>Print Claim</button>
                                    </Link> */}
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

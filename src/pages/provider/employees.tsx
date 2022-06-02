import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { formatDate } from '../../common/util';
import { Card } from '../../components/Card';
import { EnsureAuthorized } from '../../components/EnsureAuthorized';
import { ClientContract } from '../../models/client-contract.entity';
import { TPAEmployee } from '../../models/tpa-employee.entity';
import { ProviderEmployee } from '../../models/provider-employee.entity';
import { command, query } from '../../services/cq.service';

const handleError = (err: any) => {
    return err.message || 'خطأ اثناء الحصول علي بيانات الطلب';
};

const checkAppPage: NextPage = () => {
    const [employees, setEmployees] = useState<TPAEmployee[]>([]);

    const setEmployeeStatus = useCallback(
        async (employeeId: number, active: boolean) => {
            await command('provider-gw', 'employee.setActive', { employeeId, active });
            await findData();
            alert('employee updated successfully');
        },
        [],
    );

    const findData = useCallback(
        async () => {
            const rows = await query('provider-gw', 'employee.findAll', {});
            setEmployees(rows);
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
                    <h1 className='text-xl'>Employees</h1>
                    <hr />
                    <div className='flex flex-col gap-2'>
                        {employees.map(employee => <>
                            <div className='grid grid-cols-2 gap-1 bg-gray-100'>
                                <div className='col-span-2'>
                                    <b>{employee.user.displayName}</b>
                                </div>
                                <div className=''>
                                    <span className='text-xs text-gray-500'>Active:</span>
                                    {JSON.stringify(employee.isActive)} <button className='btn btn-primary btn-xs' onClick={() => {setEmployeeStatus(employee.id, !!employee.isActive)}}>Change</button>
                                </div>
                                <div className=''>
                                    <span className='text-xs text-gray-500'>Mobile No:</span>
                                    {employee.user.mobileNumber}
                                </div>
                                <div className=''>
                                    <span className='text-xs text-gray-500'>Email:</span>
                                    {employee.user.email}
                                </div>
                                <div className=''>
                                    <span className='text-xs text-gray-500'>Created Date:</span>
                                    {formatDate(String(employee.createdAt))}
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

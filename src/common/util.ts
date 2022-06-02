import { format, parseISO, isValid } from "date-fns";
var numeral = require('numeral');


export function formatDate(dateIsoString: string): string {
    const r =  !!dateIsoString && dateIsoString != '' ? format(parseISO(dateIsoString), 'yyyy-MM-dd') : '';
    return r;
}

export function formatSimpleDateForTextField(date: Date): string {
    const r =  format(date, 'yyyy-MM-dd');
    return r;
}

export function formatNewDateForTextField(): string {
    const r =  format(new Date(), 'yyyy-MM-dd');
    return r;
}

export function formatIsoDateForTextField(dateIsoString: string): string {
    const r =  !!dateIsoString && dateIsoString != '' ? format(parseISO(dateIsoString), 'yyyy-MM-dd') : '';
    return r;
}

export function formatNumber(numberValue: number) {
    return numeral(numberValue).format('0,0');
}
export function formatNumber2Decimal(numberValue: number) {
    return numeral(numberValue).format('0,0.00');
}

export function formatNumber4Decimal(numberValue: number) {
    return numeral(numberValue).format('0,0.0000');
}

export function formatMemberNo(numberValue: number) {
    return numeral(numberValue).format('000000');
}

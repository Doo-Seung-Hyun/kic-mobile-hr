import { parse } from "date-fns";
import type {Holiday} from "../../../types/holiday.ts";

const today = new Date();

const MOCK_HOLIDAYS: Holiday[] = [
    {yyyyMMdd: '20250101', date: parse('20250101', 'yyyyMMdd', today), name: '신정'},
    {yyyyMMdd: '20250127', date: parse('20250127', 'yyyyMMdd', today), name: '임시공휴일'},
    {yyyyMMdd: '20250128', date: parse('20250128', 'yyyyMMdd', today), name: '설날'},
    {yyyyMMdd: '20250129', date: parse('20250129', 'yyyyMMdd', today), name: '설날'},
    {yyyyMMdd: '20250130', date: parse('20250130', 'yyyyMMdd', today), name: '설날'},
    {yyyyMMdd: '20250301', date: parse('20250301', 'yyyyMMdd', today), name: '삼일절'},
    {yyyyMMdd: '20250303', date: parse('20250303', 'yyyyMMdd', today), name: '대체공휴일'},
    {yyyyMMdd: '20250505', date: parse('20250505', 'yyyyMMdd', today), name: '어린이날'},
    {yyyyMMdd: '20250505', date: parse('20250505', 'yyyyMMdd', today), name: '부처님오신날'},
    {yyyyMMdd: '20250506', date: parse('20250506', 'yyyyMMdd', today), name: '대체공휴일'},
    {yyyyMMdd: '20250603', date: parse('20250603', 'yyyyMMdd', today), name: '대통령선거'},
    {yyyyMMdd: '20250606', date: parse('20250606', 'yyyyMMdd', today), name: '현충일'},
    {yyyyMMdd: '20250815', date: parse('20250815', 'yyyyMMdd', today), name: '광복절'},
    {yyyyMMdd: '20251003', date: parse('20251003', 'yyyyMMdd', today), name: '개천절'},
    {yyyyMMdd: '20251005', date: parse('20251005', 'yyyyMMdd', today), name: '추석'},
    {yyyyMMdd: '20251006', date: parse('20251006', 'yyyyMMdd', today), name: '추석'},
    {yyyyMMdd: '20251007', date: parse('20251007', 'yyyyMMdd', today), name: '추석'},
    {yyyyMMdd: '20251008', date: parse('20251008', 'yyyyMMdd', today), name: '대체공휴일'},
    {yyyyMMdd: '20251009', date: parse('20251009', 'yyyyMMdd', today), name: '한글날'},
    {yyyyMMdd: '20251225', date: parse('20251225', 'yyyyMMdd', today), name: '크리스마스'},
];

export default MOCK_HOLIDAYS;
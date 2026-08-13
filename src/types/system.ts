export const SYSTEM_CATEGORIES = [
  "ຕິດຕາມລູກຄ້າ",
  "ຮ້ອງຂໍ ແລະ ສ້ອມແປງ",
  "ລາຍງານ ແລະ ປະເມີນຜົນ",
  "ຄຸ້ມຄອງ",
  "ການຕິດຕາມ",
  "Compliance",
  "Website",
  "ຕິດຕາມເວລາ",
   "ຝຶກອົບຮົມ",
   "ທາບທາມ",
   "ຄຸ້ມຄອງພະນັກງານ",
  "Procurement",
  "Services",
  "Office",
  "ເອກະສານ",
   "ການຈັດການ",
  "Information",
  "Administration",
] as const;

export type SystemCategory = (typeof SYSTEM_CATEGORIES)[number];

export type System = {
  id: string;
  name: string;
  description?: string;
  category?: SystemCategory;
  image: string;
  imageScale?: number;
  url: string;
  keywords?: string[];
};

import type { System } from "@/types/system";

export const systems: System[] = [
 
    {
    id: "edl-website",
    name: "ລະບົບ EDL Website",
    description: "ເວັບໄຊ ຟຟລ",
    category: "Website",
    image: "/images/Website.png",
    imageScale: 1.3,
    url: "https://edl.com.la/",
    keywords: ["website", "edl", "ເວັບໄຊ"],
  },


  {
    id: "edl-app",
    name: "ລະບົບ EDL App",
    description: "ດາວໂຫຼດ EDL App ສຳລັບ iOS ແລະ Android",
    category: "Services",
    image: "/images/edl_logo_transparent.png",
    downloads: [
      {
        name: "App Store",
        platform: "iOS",
        image: "/images/apple.png",
        url: "https://apps.apple.com/la/app/edl-app/id6648761593",
      },
      {
        name: "Google Play",
        platform: "Android",
        image: "/images/appstore.png",
        url: "https://play.google.com/store/apps/details?id=com.edl.edl_app",
      },
    ],
    web: {
      name: "Admin EDL App ",
      image: "/images/edl_logo_transparent.png",
      url: "https://app-api.edl.com.la/signin?callbackUrl=%2F",
    },
    keywords: ["edl app", "ios", "android", "apple", "app store", "google play", "ດາວໂຫຼດ"],
  },

  {
    id: "kpi",
    name: "ລະບົບ KPI",
    description: "ລະບົບປະເມີນພະນັກງານ",
    category: "ລາຍງານ ແລະ ປະເມີນຜົນ",
    image: "/images/KPI.png",
    imageScale: 1.3,
    url: "https://hrkpi-v3.edllao.com/",
    keywords: ["kpi", "performance", "indicator", "dashboard", "ຕົວຊີ້ວັດ", "ຜົນງານ"],
  },

  {
    id: "hr-checkin",
    name: "ລະບົບ EDL HR CheckIn App",
    description: "ແອັບຕິດຕາມພະນັກງານເຂົ້າ-ອອກວຽກ",
    category: "ຕິດຕາມເວລາ",
    image: "/images/CheckIn.png",
    imageScale: 0.9,
    url: "https://hrcheckin-admin.edl.com.la/",
    keywords: ["hr", "checkin", "attendance", "ເຂົ້າ-ອອກວຽກ", "ຕິດຕາມ"],
  } ,

  {
    id: "helpdesk",
    name: "ລະບົບ Helpdesk",
    description: "ລະບົບແຈ້ງສ້ອມແປງ",
    category: "ຮ້ອງຂໍ ແລະ ສ້ອມແປງ",
    image: "/images/HelpDesk.png",
    imageScale: 1.5,
    url: "https://helpdesk.edl.com.la/",
    keywords: ["helpdesk", "ticket", "support", "it", "ຊ່ວຍເຫຼືອ", "ປັນຫາ"],
  },

  {
    id: "loan",
    name: "ລະບົບ Loan",
    description: "ລະບົບຄຸ້ມຄອງ ແລະ ຕິດຕາມເງິນກູ້",
    category: "ຄຸ້ມຄອງ",
    image: "/images/Loan.png",
    imageScale: 1.3,
    url: "https://loan.edl.com.la/",
    keywords: ["loan", "lending", "credit", "ກູ້ຢືມ", "ສິນເຊື່ອ"],
  },

  {
    id: "ppa",
    name: "ລະບົບ PPA",
    description: "ລະບົບຕິດຕາມສັນຍາຊື້ຂາຍພະລັງງານ",
    category: "ການຕິດຕາມ",
    image: "/images/PPA.png",
    imageScale: 1.0,
    url: "https://ppa.edl.com.la/",
    keywords: ["ppa", "operations", "ດຳເນີນງານ"],
  },

  {
    id: "taxris",
    name: "ລະບົບ Invoice & TaxRis",
    description: "ລະບົບແຈ້ງໃບເກັບເງິນອາກອນ",
    category: "Compliance",
    image: "/images/taxris_hd_logo.ico",
    imageScale:1,
    url: "https://invoice-taxris.edl.com.la/",
    keywords: ["tax", "risk", "compliance", "ພາສີ", "ຄວາມສ່ຽງ", "ການປະຕິບັດ"],
  },

  {
    id: "vms",
    name: "ລະບົບ VMS",
    description: "ລະບົບຄຸ້ມຄອງພາຫະນະ ຟຟລ",
    category: "ການຕິດຕາມ",
    image: "/images/VMS.png",
    imageScale: 1.25,
    url: "https://vms.edl.com.la/",
    keywords: ["vms", "vendor", "supplier", "ຜູ້ສະໜອງ", "ການຄຸ້ມຄອງ"],
  },
  
   {
    id: "customer",
    name: "ລະບົບ Customer",
    description: "ລະບົບສຳຫຼວດຄວາມເພິ່ງພໍໃຈລູກຄ້າ",
    category: "ຕິດຕາມລູກຄ້າ",
    image: "/images/customer.png",
    imageScale: 1.3,
    url: "https://customer-survey.edl.com.la/",
    keywords: ["customer", "crm", "ລູກຄ້າ", "ການຂາຍ"],
  },

  {
    id: "hrms",
    name: "ລະບົບ HRMs (Human Resource...)",
    description: "ລະບົບຄຸ້ມຄອງພະນັກງານ",
    category: "ຄຸ້ມຄອງພະນັກງານ",
    image: "/images/hrms.png",
    imageScale: 1.3,
    url: "https://hrm.edl.com.la/",
    keywords: ["hrms", "hr", "human resource", "ຊັບພະຍາກອນມະນຸດ", "ພະນັກງານ"],
  },

  {
    id: "pad",
    name: "ລະບົບ PAD (Procurement Agreement...)",
    description: "ລະບົບຈັດເກັບເອກະສານສັນຍາຈັດຊື້-ຈັດຈ້າງ",
    category: "Procurement",
    image: "/images/PAD.png",
    imageScale: 1.23,
    url: "https://pad.edl.com.la/",
    keywords: ["pad", "procurement", "agreement", "ຈັດຊື້", "ສັນຍາ"],
  },

  {
    id: "ppc",
    name: "ລະບົບ PPC (Power Purchase Confirmation...)",
    description: "ລະບົບຢັ້ງຢືນຊື້-ຂາຍພະລັງງານໄຟຟ້າ",
    category: "ການຈັດການ",
    image: "/images/PowerPurchase.png",
    imageScale: 1.3,
    url: "https://ppcd.edl.com.la/",
    keywords: ["ppc", "power purchase", "confirmation", "ຊື້ພະລັງງານ", "ຢືນຢັນ"],
  },

  {
    id: "e-service",
    name: "ລະບົບ E-Service",
    description: "ລະບົບບໍລິການໄຟຟ້າ",
    category: "Services",
    image: "/images/eservice.svg",
    imageScale: 1.2,
    url: "https://e-service.edl.com.la/",
    keywords: ["e-service", "service", "ບໍລິການ", "ອອນລາຍນ໌"],
  },

  {
    id: "e-office",
    name: "ລະບົບ E-Office",
    description: "ລະບົບເອກະສານທັນສະໄໝ",
    category: "Office",
    image: "/images/eoffice.jpg",
    imageScale: 1.45,
    url: "https://eoffice.edl.com.la/",
    keywords: ["e-office", "office", "ສຳນັກງານ", "ອັດສະສົດ"],
  },

  {
    id: "meeting-room-booking",
    name: "ລະບົບ Meeting Room Booking...",
    description: "ລະບົບຈອງຫ້ອງປະຊຸມ",
    category: "Office",
    image: "/images/meeting.png",
    imageScale: 1.55,
    url: "https://meeting.edl.com.la/",
    keywords: ["meeting", "room", "booking", "ຈອງ", "ຫ້ອງປະຊຸມ"],
  },

  {
    id: "e-document",
    name: "ລະບົບ E-Document",
    description: "ລະບົບຈັດເກັບເອກະສານບັນຊີ",
    category: "ເອກະສານ",
    image: "/images/E-DOC.png",
    url: "https://edocument.edl.com.la/",
    keywords: ["e-document", "document", "ເອກະສານ", "ອອນລາຍນ໌"],
  },

  {
    id: "successor-planning",
    name: "ລະບົບ Successor Planning...",
    description: "ລະບົບທາບທາມ",
    category: "ທາບທາມ",
    image: "/images/SPM.png",
    imageScale: 2.4,
    url: "https://successorhq2025.edllao.com",
    keywords: ["successor", "planning", "ສືບທອດ", "ວາງແຜນ"],
  },

  {
    id: "jprl-info",
    name: "ລະບົບ JPRL Information...",
    description: "ລະບົບຖານຂໍ້ມູນຊາວໜຸ່ມ",
    category: "Information",
    image: "/images/jprl.png",
    imageScale: 1.26,
    url: "https://jprl.edl.com.la/",
    keywords: ["jprl", "information", "ຂໍ້ມູນ", "ຂ່າວສານ"],
  },

  {
    id: "mou-document",
    name: "ລະບົບ MOU Document...",
    description: "ລະບົບເອກະສານບົດບັນທຶກຄວາມເຂົ້າໃຈ",
    category: "ເອກະສານ",
    image: "/images/MOU.png",
    imageScale: 1.7,
    url: "https://mou.edl.com.la/",
    keywords: ["mou", "document", "ບົດບັນທຶກ", "ຄວາມເຂົ້າໃຈ"],
  },

  {
    id: "training-record",
    name: "ລະບົບ Training Record...",
    description: "ລະບົບຝຶກອົບຮົມ ແລະ ພັດທະນາບຸກຄະລາກອນ",
    category: "ຝຶກອົບຮົມ",
    image: "/images/Training.png",
    imageScale:1.1,
    url: "https://hrd-training.edl.com.la/",
    keywords: ["training", "record", "ຝຶກອົບຮົມ", "ບັນທຶກ"],
  },

  {
    id: "web-admin",
    name: "ລະບົບ Web Admin",
    description: "ລະບົບຄຸຸ້ມຄອງຂໍ້ມູນເວັບໄຊ ແລະ EDL-App",
    category: "Administration",
    image: "/images/webadmin.png",
    imageScale:1.3,
    url: "https://app-api.edl.com.la/",
    keywords: ["web", "admin", "ຄຸ້ມຄອງ", "ເວັບໄຊຕ໌"],
  },

  {
    id: "ict-inventory",
    name: "ລະບົບຄຸ້ມຄອງສາງ ICT",
     description: "ລະບົບຄຸ້ມຄອງສາງ",
    category: "Warehouse",
    image: "/images/werehouse.png",
    imageScale:1.1,
    url: "https://ict-inventory.edl.com.la/",
    keywords: ["ict", "inventory", "warehouse", "ສາງ"],
  },

  {
    id: "ecc",
    name: "ລະບົບບໍລິການຄຸ້ມຄອງ ແລະ ສົ່ງແຈ້ງເຕືອນຂ່າວສ່ານໄຟຟ້າແບບຄົບວົງຈອນ",
    description: "ລະບົບບໍລິການຄຸ້ມຄອງ ແລະ ສົ່ງແຈ້ງເຕືອນຂ່າວສ່ານໄຟຟ້າແບບຄົບວົງຈອນ",
    category: "Services",
    image: "/images/ECC.png",
    imageScale:1.1,
    url: "https://app-portal.edl.com.la/signin",
    keywords: ["ecc", "1199", "contact center", "app portal", "ບໍລິການ", "ແຈ້ງເຕືອນ", "ໄຟຟ້າ"],
  }
];

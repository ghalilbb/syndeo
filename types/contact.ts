export interface ContactPageData {
  title: string;
  description: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    chamberOfCommerce?: string;
    vatNumber?: string;
    workingHours?: string;
  };
  socialMedia?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contactTile?: {
    title: string;
    description: string;
  };
  mapSettings: {
    embedUrl: string;
    mapHeight: number;
  };
  contactForm: {
    formTitle: string;
    formDescription: string;
    successMessage: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface ContactInfo {
  icon: any; // Tabler icon component
  title: string;
  description: string;
  link?: string;
}

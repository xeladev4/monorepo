"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowLeft,
  Share2,
  Check,
  Wifi,
  Car,
  Shield,
  Dumbbell,
  TreePine,
  Wind,
  Utensils,
  Tv,
  Waves,
  ChevronLeft,
  ChevronRight,
  X,
  Calculator,
  Home,
  Sofa,
  CookingPot,
  ShowerHead,
  BedDouble,
  MessageSquare,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const properties = [
  {
    id: 1,
    title: "Modern 3 Bedroom Flat",
    location: "Lekki Phase 1, Lagos",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    price: 3500000,
    beds: 3,
    baths: 3,
    sqm: 150,
    tag: "POPULAR",
    tagColor: "bg-primary",
    description:
      "A stunning modern apartment in the heart of Lekki Phase 1. This fully serviced property offers the perfect blend of luxury and convenience, featuring contemporary finishes, spacious rooms, and premium amenities. Ideal for professionals and families looking for comfort in a prime location.",
    features: [
      "24/7 Power Supply",
      "Fully Fitted Kitchen",
      "Air Conditioning",
      "Swimming Pool",
      "Gym Access",
      "Secure Parking",
      "CCTV Security",
      "Fiber Internet Ready",
    ],
    images: [
      { id: 1, label: "Living Room", icon: Sofa },
      { id: 2, label: "Master Bedroom", icon: BedDouble },
      { id: 3, label: "Kitchen", icon: CookingPot },
      { id: 4, label: "Bathroom", icon: ShowerHead },
      { id: 5, label: "Second Bedroom", icon: Bed },
      { id: 6, label: "Balcony View", icon: TreePine },
    ],
    landlord: {
      name: "Estate Pro Management",
      verified: true,
      listings: 15,
      responseTime: "Within 24 hours",
    },
    whistleblower: {
      name: "Chiamaka Okonkwo",
      rating: 4.8,
      reviews: 24,
      bio: "Lives in Block 5, Flat 2A - familiar with the building and can answer questions about neighborhood",
    },
  },
  {
    id: 2,
    title: "Spacious 2 Bedroom Apartment",
    location: "Wuse 2, Abuja",
    address: "Plot 42, Aminu Kano Crescent, Wuse 2, Abuja",
    price: 2800000,
    beds: 2,
    baths: 2,
    sqm: 120,
    tag: "NEW",
    tagColor: "bg-secondary",
    description:
      "A beautifully designed 2 bedroom apartment in the prestigious Wuse 2 area. Features modern architecture, quality finishes, and is located close to shopping centers, restaurants, and major business districts.",
    features: [
      "24/7 Security",
      "Backup Generator",
      "Spacious Parking",
      "Water Treatment",
      "Modern Kitchen",
      "Balcony",
    ],
    images: [
      { id: 1, label: "Living Room", icon: Sofa },
      { id: 2, label: "Master Bedroom", icon: BedDouble },
      { id: 3, label: "Kitchen", icon: CookingPot },
      { id: 4, label: "Bathroom", icon: ShowerHead },
      { id: 5, label: "Guest Bedroom", icon: Bed },
    ],
    landlord: {
      name: "Quality Homes Ltd",
      verified: true,
      listings: 20,
      responseTime: "Within 12 hours",
    },
    whistleblower: {
      name: "Adanna Smith",
      rating: 4.9,
      reviews: 18,
      bio: "Resident since 2022 - can give insights about building security, amenities, and neighborhood atmosphere",
    },
  },
  {
    id: 3,
    title: "Luxury 4 Bedroom Duplex",
    location: "Ikoyi, Lagos",
    address: "7 Bourdillon Road, Ikoyi, Lagos",
    price: 8500000,
    beds: 4,
    baths: 4,
    sqm: 300,
    tag: "PREMIUM",
    tagColor: "bg-accent",
    description:
      "An exquisite luxury duplex in the most sought-after neighborhood in Lagos. This property features premium finishes, smart home technology, a private garden, and direct access to the best schools and entertainment venues.",
    features: [
      "Smart Home System",
      "Private Garden",
      "Staff Quarters",
      "Swimming Pool",
      "Home Cinema",
      "Wine Cellar",
      "Double Garage",
      "Elevator",
    ],
    images: [
      { id: 1, label: "Grand Living Room", icon: Sofa },
      { id: 2, label: "Master Suite", icon: BedDouble },
      { id: 3, label: "Gourmet Kitchen", icon: CookingPot },
      { id: 4, label: "Spa Bathroom", icon: ShowerHead },
      { id: 5, label: "Second Bedroom", icon: Bed },
      { id: 6, label: "Third Bedroom", icon: Bed },
      { id: 7, label: "Home Office", icon: Tv },
      { id: 8, label: "Pool Area", icon: Waves },
    ],
    landlord: {
      name: "Urban Living Spaces",
      verified: true,
      listings: 8,
      responseTime: "Within 48 hours",
    },
    agent: {
      name: "Emeka Nwosu",
      avatar: "EN",
      rating: 4.9,
      reviews: 203,
      propertiesManaged: 8,
      responseTime: "Usually responds within 30 minutes",
      verified: true,
      inspectionFee: 25000,
    },
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    location: "Yaba, Lagos",
    address: "25 Herbert Macaulay Way, Yaba, Lagos",
    price: 1200000,
    beds: 1,
    baths: 1,
    sqm: 45,
    tag: null,
    tagColor: null,
    description:
      "A compact and efficient studio apartment perfect for young professionals. Located in the vibrant Yaba tech hub with easy access to transportation, coworking spaces, and nightlife.",
    features: [
      "Prepaid Meter",
      "Water Heater",
      "Built-in Wardrobe",
      "Tiled Floors",
      "Security Gate",
    ],
    images: [
      { id: 1, label: "Studio Space", icon: Sofa },
      { id: 2, label: "Bedroom Area", icon: BedDouble },
      { id: 3, label: "Kitchenette", icon: CookingPot },
      { id: 4, label: "Bathroom", icon: ShowerHead },
    ],
    landlord: {
      name: "Yaba Properties",
      verified: false,
      listings: 3,
      responseTime: "Within 48 hours",
    },
    agent: {
      name: "Funke Adeyemi",
      avatar: "FA",
      rating: 4.5,
      reviews: 45,
      propertiesManaged: 12,
      responseTime: "Usually responds within 3 hours",
      verified: true,
      inspectionFee: 5000,
    },
  },
  {
    id: 5,
    title: "Executive 3 Bedroom Flat",
    location: "Victoria Island, Lagos",
    address: "18 Adeola Odeku Street, Victoria Island, Lagos",
    price: 5500000,
    beds: 3,
    baths: 3,
    sqm: 180,
    tag: "HOT",
    tagColor: "bg-destructive",
    description:
      "A premium executive apartment in the commercial heart of Lagos. Perfect for business executives with proximity to major corporate offices, embassies, and high-end restaurants.",
    features: [
      "Concierge Service",
      "Rooftop Lounge",
      "Business Center",
      "Underground Parking",
      "Gym & Spa",
      "24/7 Power",
    ],
    images: [
      { id: 1, label: "Living Room", icon: Sofa },
      { id: 2, label: "Master Bedroom", icon: BedDouble },
      { id: 3, label: "Kitchen", icon: CookingPot },
      { id: 4, label: "En-suite Bath", icon: ShowerHead },
      { id: 5, label: "Second Bedroom", icon: Bed },
      { id: 6, label: "City View", icon: TreePine },
    ],
    landlord: {
      name: "Luxury Estates Nigeria",
      verified: true,
      listings: 25,
      responseTime: "Within 6 hours",
    },
    agent: {
      name: "Tunde Bakare",
      avatar: "TB",
      rating: 4.7,
      reviews: 156,
      propertiesManaged: 28,
      responseTime: "Usually responds within 1 hour",
      verified: true,
      inspectionFee: 15000,
    },
  },
  {
    id: 6,
    title: "Family 4 Bedroom Bungalow",
    location: "Gwarimpa, Abuja",
    address: "12 1st Avenue, Gwarimpa Estate, Abuja",
    price: 4200000,
    beds: 4,
    baths: 3,
    sqm: 220,
    tag: null,
    tagColor: null,
    description:
      "A spacious family bungalow in the serene Gwarimpa estate. Features a large compound, boys quarters, and is located in a child-friendly neighborhood with good schools nearby.",
    features: [
      "Large Compound",
      "Boys Quarters",
      "Garage",
      "Garden Space",
      "Borehole",
      "Prepaid Meter",
    ],
    images: [
      { id: 1, label: "Living Room", icon: Sofa },
      { id: 2, label: "Master Bedroom", icon: BedDouble },
      { id: 3, label: "Kitchen", icon: CookingPot },
      { id: 4, label: "Family Bath", icon: ShowerHead },
      { id: 5, label: "Kids Room", icon: Bed },
      { id: 6, label: "Backyard", icon: TreePine },
    ],
    landlord: {
      name: "Gwarimpa Realtors",
      verified: true,
      listings: 20,
      responseTime: "Within 24 hours",
    },
    agent: {
      name: "Amina Ibrahim",
      avatar: "AI",
      rating: 4.6,
      reviews: 78,
      propertiesManaged: 35,
      responseTime: "Usually responds within 2 hours",
      verified: true,
      inspectionFee: 10000,
    },
  },
  {
    id: 7,
    title: "Modern 2 Bedroom Flat",
    location: "Ikeja GRA, Lagos",
    address: "8 Joel Ogunnaike Street, Ikeja GRA, Lagos",
    price: 2400000,
    beds: 2,
    baths: 2,
    sqm: 100,
    tag: "NEW",
    tagColor: "bg-secondary",
    description:
      "A newly renovated apartment in the quiet Ikeja GRA neighborhood. Close to the domestic airport and major shopping malls, perfect for frequent travelers.",
    features: [
      "Airport Proximity",
      "Shopping Access",
      "Quiet Neighborhood",
      "Modern Finishes",
      "Parking Space",
    ],
    images: [
      { id: 1, label: "Living Room", icon: Sofa },
      { id: 2, label: "Master Bedroom", icon: BedDouble },
      { id: 3, label: "Kitchen", icon: CookingPot },
      { id: 4, label: "Bathroom", icon: ShowerHead },
      { id: 5, label: "Guest Bedroom", icon: Bed },
    ],
    landlord: {
      name: "Metropolitan Properties",
      verified: true,
      listings: 30,
      responseTime: "Within 2 hours",
    },
    agent: {
      name: "Kola Adesanya",
      avatar: "KA",
      rating: 4.4,
      reviews: 62,
      propertiesManaged: 18,
      responseTime: "Usually responds within 4 hours",
      verified: true,
      inspectionFee: 7000,
    },
  },
  {
    id: 8,
    title: "Penthouse Suite",
    location: "Banana Island, Lagos",
    address: "3 Banana Island Road, Ikoyi, Lagos",
    price: 15000000,
    beds: 5,
    baths: 5,
    sqm: 400,
    tag: "LUXURY",
    tagColor: "bg-accent",
    description:
      "The ultimate in luxury living. This penthouse offers panoramic views of the Lagos lagoon, private elevator access, and world-class amenities. For the discerning few who demand nothing but the best.",
    features: [
      "Private Elevator",
      "Panoramic Views",
      "Infinity Pool",
      "Smart Home",
      "Wine Room",
      "Private Cinema",
      "Helipad Access",
      "Yacht Club Membership",
    ],
    images: [
      { id: 1, label: "Grand Salon", icon: Sofa },
      { id: 2, label: "Master Suite", icon: BedDouble },
      { id: 3, label: "Chef Kitchen", icon: CookingPot },
      { id: 4, label: "Spa Bathroom", icon: ShowerHead },
      { id: 5, label: "Second Suite", icon: Bed },
      { id: 6, label: "Private Cinema", icon: Tv },
      { id: 7, label: "Infinity Pool", icon: Waves },
      { id: 8, label: "Lagoon View", icon: TreePine },
    ],
    landlord: {
      name: "Elite Residences",
      verified: true,
      listings: 3,
      responseTime: "Within 2 hours",
    },
    agent: {
      name: "Ngozi Eze",
      avatar: "NE",
      rating: 5,
      reviews: 312,
      propertiesManaged: 6,
      responseTime: "Usually responds within 15 minutes",
      verified: true,
      inspectionFee: 50000,
    },
  },
];

const featureIcons: { [key: string]: React.ElementType } = {
  "24/7 Power Supply": Wind,
  "24/7 Power": Wind,
  "Fully Fitted Kitchen": Utensils,
  "Modern Kitchen": Utensils,
  "Gourmet Kitchen": Utensils,
  "Air Conditioning": Wind,
  "Swimming Pool": Waves,
  "Infinity Pool": Waves,
  "Gym Access": Dumbbell,
  "Gym & Spa": Dumbbell,
  "Secure Parking": Car,
  "Spacious Parking": Car,
  "Underground Parking": Car,
  "Parking Space": Car,
  "Double Garage": Car,
  Garage: Car,
  "CCTV Security": Shield,
  "24/7 Security": Shield,
  "Security Gate": Shield,
  "Fiber Internet Ready": Wifi,
  "Smart Home System": Wifi,
  "Smart Home": Wifi,
  "Private Garden": TreePine,
  "Garden Space": TreePine,
  Backyard: TreePine,
  "Home Cinema": Tv,
  "Private Cinema": Tv,
  Balcony: TreePine,
  "Rooftop Lounge": TreePine,
};

type PropertyDetailClientProps = {
  propertyId: string;
};

export default function PropertyDetailClient({
  propertyId,
}: PropertyDetailClientProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [paymentMonths, setPaymentMonths] = useState(12);

  const property = properties.find((p) => p.id === Number.parseInt(propertyId));

  if (!property) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="border-3 border-foreground bg-card p-12 text-center shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]">
          <Home className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="font-mono text-2xl font-black mb-2">
            Property Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The property you're looking for doesn't exist.
          </p>
          <Link href="/properties">
            <Button className="border-3 border-foreground bg-primary px-6 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
              Browse Properties
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const minDeposit = property.price * 0.2; // 20% minimum deposit
  const amountToFinance = property.price - minDeposit;
  const inspectionFee = amountToFinance * 0.075;
  const monthlyPayment = Math.round(
    (amountToFinance + inspectionFee) / paymentMonths,
  );

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length,
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b-3 border-foreground bg-muted">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 font-mono font-bold text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to listings
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="border-b-3 border-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative aspect-16/10 w-full border-3 border-foreground bg-muted shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] overflow-hidden group">
                <button
                  type="button"
                  aria-label="Open image gallery"
                  aria-haspopup="dialog"
                  className="absolute inset-0 z-10"
                  onClick={() => setShowLightbox(true)}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  {(() => {
                    const IconComponent =
                      property.images[activeImageIndex].icon;
                    return <IconComponent className="h-24 w-24 mb-4" />;
                  })()}
                  <span className="font-mono text-xl font-bold">
                    {property.images[activeImageIndex].label}
                  </span>
                  <span className="text-sm mt-2">Click to expand</span>
                </div>

                {property.tag && (
                  <span
                    className={`absolute left-4 top-4 border-3 border-foreground ${property.tagColor} px-3 py-1 text-sm font-bold`}
                  >
                    {property.tag}
                  </span>
                )}

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center border-3 border-foreground bg-background shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center border-3 border-foreground bg-background shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 z-20 border-2 border-foreground bg-background px-3 py-1 font-mono text-sm font-bold">
                  {activeImageIndex + 1} / {property.images.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 lg:grid-cols-2">
              {property.images.slice(0, 6).map((image, index) => {
                const IconComponent = image.icon;
                return (
                  <button
                    key={image.id}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-square border-3 border-foreground bg-muted transition-all ${
                      activeImageIndex === index
                        ? "shadow-[4px_4px_0px_0px_rgba(255,107,53,1)] ring-2 ring-primary"
                        : "shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-px hover:translate-y-px"
                    }`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-2">
                      <IconComponent className="h-8 w-8 mb-1" />
                      <span className="text-xs font-bold text-center leading-tight">
                        {image.label}
                      </span>
                    </div>
                  </button>
                );
              })}
              {property.images.length > 6 && (
                <button
                  onClick={() => setShowLightbox(true)}
                  className="relative aspect-square border-3 border-foreground bg-foreground text-background shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-px hover:translate-y-px transition-all"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono text-2xl font-black">
                      +{property.images.length - 6}
                    </span>
                    <span className="text-xs font-bold">More</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Location */}
              <div>
                <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h1 className="font-mono text-2xl font-black md:text-3xl lg:text-4xl">
                    {property.title}
                  </h1>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`flex h-10 w-10 items-center justify-center border-3 border-foreground bg-background shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] sm:h-12 sm:w-12 ${
                        isFavorite ? "text-destructive" : ""
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorite ? "fill-current" : ""}`}
                      />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center border-3 border-foreground bg-background shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] sm:h-12 sm:w-12">
                      <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base lg:text-lg">
                    {property.address}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="flex items-center gap-1 border-2 border-foreground bg-muted px-2 py-1 sm:gap-2 sm:px-4 sm:py-2">
                    <Bed className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm font-bold sm:text-base">
                      {property.beds} Beds
                    </span>
                  </div>
                  <div className="flex items-center gap-1 border-2 border-foreground bg-muted px-2 py-1 sm:gap-2 sm:px-4 sm:py-2">
                    <Bath className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm font-bold sm:text-base">
                      {property.baths} Baths
                    </span>
                  </div>
                  <div className="flex items-center gap-1 border-2 border-foreground bg-muted px-2 py-1 sm:gap-2 sm:px-4 sm:py-2">
                    <Square className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm font-bold sm:text-base">
                      {property.sqm} m²
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-3 border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] sm:p-6">
                <h2 className="font-mono text-lg font-bold mb-3 sm:text-xl sm:mb-4">
                  About This Property
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed sm:text-base">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="border-3 border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] sm:p-6">
                <h2 className="font-mono text-lg font-bold mb-3 sm:text-xl sm:mb-4">
                  Features & Amenities
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {property.features.map((feature, index) => {
                    const IconComponent = featureIcons[feature] || Check;
                    return (
                      <div
                        key={`${feature}-${index}`}
                        className="flex items-center gap-3 border-2 border-foreground bg-muted p-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center bg-secondary border-2 border-foreground">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Room Gallery */}
              <div className="border-3 border-foreground bg-card p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                <h2 className="font-mono text-xl font-bold mb-4">
                  Property Gallery
                </h2>
                <p className="text-muted-foreground mb-4">
                  Click on any room to view full size
                </p>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {property.images.map((image, index) => {
                    const IconComponent = image.icon;
                    return (
                      <button
                        key={image.id}
                        onClick={() => {
                          setActiveImageIndex(index);
                          setShowLightbox(true);
                        }}
                        className="group relative aspect-4/3 border-3 border-foreground bg-muted shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                          <IconComponent className="h-12 w-12 mb-2" />
                          <span className="font-mono font-bold">
                            {image.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar - Pricing & CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <div className="border-3 border-foreground bg-card p-4 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] sm:p-6">
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Annual Rent
                    </p>
                    <p className="font-mono text-2xl font-black sm:text-3xl">
                      {formatPrice(property.price)}
                    </p>
                  </div>

                  <div className="border-t-3 border-dashed border-foreground/30 pt-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calculator className="h-5 w-5 text-primary" />
                      <span className="font-mono font-bold">
                        Pay with Sheltaflex
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="block text-sm font-medium mb-2">
                        Payment Duration
                      </p>
                      <div className="flex gap-2">
                        {[3, 6, 12].map((months) => (
                          <button
                            key={months}
                            onClick={() => setPaymentMonths(months)}
                            className={`flex-1 border-2 border-foreground py-2 text-sm font-bold transition-all ${
                              paymentMonths === months
                                ? "bg-primary text-foreground"
                                : "bg-background hover:bg-muted"
                            }`}
                          >
                            {months}mo
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-3 border-primary bg-primary/10 p-4">
                      <p className="text-sm text-muted-foreground">
                        Monthly Payment
                      </p>
                      <p className="font-mono text-2xl font-black text-primary">
                        {formatPrice(monthlyPayment)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        for {paymentMonths} months (after 20% deposit)
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        *excludes inspection fee & other charges
                      </p>
                    </div>
                  </div>

                  <Link href={`/calculator?amount=${property.price}`}>
                    <Button className="w-full border-3 border-foreground bg-primary py-6 font-mono text-lg font-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                      Apply Now
                    </Button>
                  </Link>

                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Get instant approval in minutes
                  </p>
                </div>

                {/* Whistleblower Info */}
                {property.whistleblower && (
                  <div className="border-3 border-secondary bg-card p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-mono font-bold">
                        Reported by Resident
                      </h3>
                      <span className="inline-flex items-center gap-1 border-2 border-secondary bg-secondary/20 px-2 py-1 text-xs font-bold text-secondary">
                        <CheckCircle className="h-3 w-3" /> Verified
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-lg font-bold">
                        {property.whistleblower.name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="font-bold">
                          {property.whistleblower.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({property.whistleblower.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {property.whistleblower.bio}
                    </p>

                    <div className="bg-secondary/10 border-2 border-secondary p-3 rounded-sm">
                      <p className="text-xs font-bold text-secondary mb-1">
                        Why this matters:
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Get authentic information from someone who actually
                        lives in the building. Ask questions and get honest
                        answers about neighborhood life.
                      </p>
                    </div>

                    <Link href="/messages">
                      <Button className="w-full mt-4 border-3 border-secondary bg-secondary py-5 font-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Message {property.whistleblower.name}
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Landlord Info */}
                <div className="border-3 border-foreground bg-card p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                  <h3 className="font-mono font-bold mb-4">Listed By</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-muted font-mono font-bold">
                      {property.landlord.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{property.landlord.name}</p>
                      {property.landlord.verified && (
                        <span className="inline-flex items-center gap-1 text-xs text-secondary">
                          <Check className="h-3 w-3" /> Verified Partner
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">
                        Active Listings
                      </span>
                      <span className="font-bold">
                        {property.landlord.listings}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">
                        Response Time
                      </span>
                      <span className="font-bold">
                        {property.landlord.responseTime}
                      </span>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-3 border-foreground bg-transparent py-5 font-bold shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                  >
                    Contact Landlord
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center border-3 border-background bg-background text-foreground"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 flex h-14 w-14 items-center justify-center border-3 border-background bg-background text-foreground"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="max-w-4xl w-full">
            <div className="relative aspect-16/10 border-3 border-background bg-muted">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                {(() => {
                  const IconComponent = property.images[activeImageIndex].icon;
                  return <IconComponent className="h-32 w-32 mb-4" />;
                })()}
                <span className="font-mono text-2xl font-bold">
                  {property.images[activeImageIndex].label}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {property.images.map((image, index) => {
                const IconComponent = image.icon;
                return (
                  <button
                    key={image.id}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-16 w-16 border-2 flex items-center justify-center ${
                      activeImageIndex === index
                        ? "border-primary bg-primary/20"
                        : "border-background/50 bg-background/10"
                    }`}
                  >
                    <IconComponent className="h-6 w-6 text-background" />
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 flex h-14 w-14 items-center justify-center border-3 border-background bg-background text-foreground"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </main>
  );
}

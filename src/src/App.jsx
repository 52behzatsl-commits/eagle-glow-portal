import { useState } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');`;

const USERS = [
  { id: "admin", name: "Behzat", email: "behzat@eagleglow.com", password: "admin123", role: "admin" },
  { id: "c1", name: "Ahmet Yılmaz", email: "ahmet@ornek.com", password: "ahmet123", role: "client", company: "Yılmaz Deri" },
  { id: "c2", name: "Selin Kaya", email: "selin@ornek.com", password: "selin123", role: "client", company: "Kaya Tekstil" },
];

const INITIAL_CLIENTS = [
  {
    id: "c1", name: "Ahmet Yılmaz", company: "Yılmaz Deri", email: "ahmet@ornek.com",
    package: "Growth Pack", packageColor: "#c9a96e", since: "Oca 2025",
    platforms: ["Etsy", "Shopify"], progress: 65,
    services: [
      { id: "s1", title: "Etsy mağaza kurulumu", status: "done", date: "10 Oca" },
      { id: "s2", title: "10 listing copy yazımı", status: "done", date: "18 Oca" },
      { id: "s3", title: "Shopify kurulumu", status: "in_progress", date: "—" },
      { id: "s4", title: "Meta Ads kurulumu", status: "pending", date: "—" },
      { id: "s5", title: "Fotoğraf brief hazırlama", status: "pending", date: "—" },
    ],
    actions: [
      { id: "a1", title: "Etsy'e 10 listing'i yükle", detail: "Hazırlanan metinleri kendi Etsy hesabına gir.", status: "pending", urgent: true },
      { id: "a2", title: "Shopify ödeme yöntemini ekle", detail: "Shopify admin > Ayarlar > Ödemeler bölümünden iyzico entegrasyonunu tamamla.", status: "pending", urgent: false },
      { id: "a3", title: "Ürün fotoğraflarını gönder", detail: "Brief'e uygun 15 ürün fotoğrafını Drive'a yükle.", status: "done", urgent: false },
    ],
    files: [
      { id: "f1", name: "Etsy Listing Metinleri.docx", size: "48 KB", date: "18 Oca", type: "doc" },
      { id: "f2", name: "Fotoğraf Brief.pdf", size: "1.2 MB", date: "20 Oca", type: "pdf" },
      { id: "f3", name: "Shopify Kurulum Rehberi.pdf", size: "890 KB", date: "25 Oca", type: "pdf" },
    ],
    notes: "Ürün fotoğrafları için randevu Şubat ilk haftasına alındı.",
  },
  {
    id: "c2", name: "Selin Kaya", company: "Kaya Tekstil", email: "selin@ornek.com",

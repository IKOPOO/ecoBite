"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    LeafIcon,
    RecycleIcon,
    ShoppingBagIcon,
    StoreIcon,
    ChevronRightIcon,
} from "@/components/icons"

export function LandingHero() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            {/* Decorative Gradients with Parallax */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] opacity-40 dark:opacity-20 transition-transform duration-75 ease-out"
                    style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                />
                <div
                    className="absolute -right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-green-400/20 blur-[100px] opacity-40 dark:opacity-20 transition-transform duration-75 ease-out"
                    style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
                />
            </div>

            <div className="container mx-auto px-4">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-700 fill-mode-forwards">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-primary">#1 Food Rescue App</span>
                        </div>

                        <h1 className="text-balance text-5xl font-extrabold tracking-tight lg:text-7xl leading-[1.1]">
                            Makan Enak, <br />
                            <span className="bg-gradient-to-r from-primary via-green-500 to-emerald-600 bg-clip-text text-transparent">
                                Tanpa Sisa.
                            </span>
                        </h1>

                        <p className="max-w-lg text-xl text-muted-foreground leading-relaxed">
                            Temukan makanan berkualitas dari restoran favoritmu dengan harga hemat hingga 70%. Pilihan cerdas untuk dompet dan bumi.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link href="/marketplace">
                                <Button size="lg" className="h-14 gap-2 rounded-full px-8 text-base shadow-lg shadow-primary/25 transition-transform hover:scale-105">
                                    Mulai Selamatkan Makanan
                                    <ChevronRightIcon className="size-5" />
                                </Button>
                            </Link>
                            <Link href="/register?role=seller">
                                <Button size="lg" variant="outline" className="h-14 gap-2 rounded-full border-2 px-8 text-base hover:bg-muted/50">
                                    <StoreIcon className="size-5" />
                                    Gabung Mitra
                                </Button>
                            </Link>
                        </div>

                        {/* Modern Stats */}
                        <div className="grid grid-cols-3 gap-8 border-t border-border pt-8">
                            <div className="space-y-1">
                                <p className="text-3xl font-bold tracking-tight text-foreground">12k+</p>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Kg Makanan</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold tracking-tight text-foreground">8k+</p>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pengguna</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold tracking-tight text-foreground">350+</p>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mitra</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Composition with Parallax */}
                    <div className="relative isolate animate-in fade-in slide-in-from-right-10 duration-1000 delay-200 fill-mode-forwards"
                        style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
                        <div className="relative mx-auto aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-border/20">
                            <img
                                src="/hero-food-rescue.png"
                                alt="Makanan segar yang diselamatkan"
                                className="size-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                                style={{ transform: `scale(1.1) translateY(${scrollY * -0.05}px)` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <p className="text-sm font-medium opacity-90 mb-2">Didukung oleh</p>
                                <div className="flex items-center gap-4 opacity-80">
                                    <div className="h-8 w-24 bg-white/20 rounded-lg animate-pulse" />
                                    <div className="h-8 w-20 bg-white/20 rounded-lg animate-pulse delay-75" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Glass Elements with Inverse Parallax */}
                        <div
                            className="absolute -left-12 top-1/4 z-20 hidden lg:block transition-transform duration-75 ease-out"
                            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
                        >
                            <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-1 hover:scale-105">
                                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <LeafIcon className="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground dark:text-white">Eco-Friendly</p>
                                    <p className="text-xs text-muted-foreground dark:text-white/70">Kurangi Emisi CO2</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="absolute -right-8 bottom-1/4 z-20 hidden lg:block transition-transform duration-75 ease-out"
                            style={{ transform: `translateY(${scrollY * -0.08}px)` }}
                        >
                            <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-1 hover:scale-105">
                                <div className="flex size-12 items-center justify-center rounded-full bg-orange-500 text-white">
                                    <ShoppingBagIcon className="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground dark:text-white">Hemat 70%</p>
                                    <p className="text-xs text-muted-foreground dark:text-white/70">Setiap Hari</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

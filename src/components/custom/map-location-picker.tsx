'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const GOONG_MAPTILES_KEY = process.env.NEXT_PUBLIC_GOONG_MAPTILES_KEY;
const GOONG_API_KEY = process.env.NEXT_PUBLIC_GOONG_API_KEY;
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Set Mapbox access token
if (MAPBOX_ACCESS_TOKEN) {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
}

interface MapLocationPickerProps {
    value?: string;
    lat?: number;
    lng?: number;
    onChange: (data: { address: string; lat: number; lng: number }) => void;
    placeholder?: string;
    className?: string;
}

export function MapLocationPicker({
    value = '',
    lat: initialLat,
    lng: initialLng,
    onChange,
    placeholder = 'Nhập Vị trí',
    className,
}: MapLocationPickerProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(value);
    const [tempLocation, setTempLocation] = useState({
        address: value,
        lat: initialLat || 21.0285,
        lng: initialLng || 105.8542
    });

    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);
    const [mapError, setMapError] = useState<string | null>(null);

    // FIX: Properly handle top-level effects
    useEffect(() => {
        if (!open) {
            setSearch(value);
            setTempLocation({
                address: value,
                lat: initialLat || 21.0285,
                lng: initialLng || 105.8542
            });
            setMapError(null);
        }
    }, [value, initialLat, initialLng, open]);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                if (mapContainer.current) {
                    initMap();
                }
            }, 300);
            return () => {
                clearTimeout(timer);
                if (map.current) {
                    map.current.remove();
                    map.current = null;
                    marker.current = null;
                }
            };
        }
    }, [open]);

    const initMap = () => {
        if (!mapContainer.current || map.current) return;

        if (!GOONG_API_KEY) {
            setMapError('Thiếu cấu hình API Key cho bản đồ.');
            return;
        }

        const currentLat = tempLocation.lat || 21.0285;
        const currentLng = tempLocation.lng || 105.8542;

        try {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12', // Use Mapbox style like xTechFe
                center: [currentLng, currentLat],
                zoom: 15,
                preserveDrawingBuffer: true
            });

            map.current.on('load', () => {
                map.current?.resize();
                setMapError(null);
                // Auto-fill address with coordinates if empty
                if (!tempLocation.address) {
                    const { lat, lng } = tempLocation;
                    const coordsAddr = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                    setTempLocation(prev => ({ ...prev, address: coordsAddr }));
                    setSearch(coordsAddr);
                }
            });

            map.current.on('error', (e) => {
                console.error('Mapbox/Goong error:', e);
                const error = e.error as any;
                if (error && error.status === 403) {
                    setMapError('API Key không hợp lệ hoặc bị từ chối.');
                }
            });

            // Custom Blue Marker
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.style.width = '32px';
            el.style.height = '32px';
            el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
            el.style.backgroundSize = 'contain';
            el.style.cursor = 'pointer';

            marker.current = new mapboxgl.Marker({ color: '#3b82f6', draggable: true })
                .setLngLat([currentLng, currentLat])
                .addTo(map.current);

            marker.current.on('dragend', () => {
                if (marker.current) {
                    const { lng, lat } = marker.current.getLngLat();
                    updateMarkerAndAddress(lat, lng);
                }
            });

            map.current.on('click', async (e) => {
                const { lng, lat } = e.lngLat;
                updateMarkerAndAddress(lat, lng);
            });
        } catch (error) {
            console.error('Map init error:', error);
            setMapError('Không thể khởi tạo bản đồ.');
        }
    };

    const updateMarkerAndAddress = async (lat: number, lng: number) => {
        if (marker.current) marker.current.setLngLat([lng, lat]);
        if (map.current) map.current.flyTo({ center: [lng, lat], zoom: 16 });

        // Update immediately with coordinates as fallback
        const coordsAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        setTempLocation({ address: coordsAddress, lat, lng });
        setSearch(coordsAddress);

        setIsLoading(true);
        try {
            if (!GOONG_API_KEY) throw new Error('No API Key');

            const response = await fetch(
                `https://rsapi.goong.io/Geocode?latlng=${lat},${lng}&api_key=${GOONG_API_KEY}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const address = data.results[0].formatted_address;
                setTempLocation({ address, lat, lng });
                setSearch(address);
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            // Keep the coordinates address if API fails
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (val: string) => {
        setSearch(val);
        if (val.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://rsapi.goong.io/Place/Autocomplete?api_key=${GOONG_API_KEY}&input=${encodeURIComponent(val)}`
            );
            const data = await response.json();
            setSuggestions(data.predictions || []);
            setIsSuggestionsOpen(true);
        } catch (error) {
            console.error('Autocomplete error:', error);
        }
    };

    const selectSuggestion = async (suggestion: any) => {
        setSearch(suggestion.description);
        setSuggestions([]);
        setIsSuggestionsOpen(false);
        setIsLoading(true);

        try {
            const response = await fetch(
                `https://rsapi.goong.io/Place/Detail?place_id=${suggestion.place_id}&api_key=${GOONG_API_KEY}`
            );
            const data = await response.json();
            if (data.result && data.result.geometry) {
                const { lat, lng } = data.result.geometry.location;
                if (marker.current) marker.current.setLngLat([lng, lat]);
                if (map.current) map.current.flyTo({ center: [lng, lat], zoom: 16 });
                setTempLocation({ address: suggestion.description, lat, lng });
            }
        } catch (error) {
            console.error('Place detail error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinue = () => {
        onChange({
            address: tempLocation.address,
            lat: tempLocation.lat,
            lng: tempLocation.lng,
        });
        setOpen(false);
    };

    return (
        <div className={cn('w-full', className)}>
            <div
                className="flex items-center justify-between w-full h-10 px-3 bg-white border border-input rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(true)}
            >
                <span className={cn("text-sm truncate max-w-[90%]", !value && "text-gray-400 font-normal")}>
                    {value || placeholder}
                </span>
                <MapPin className="h-4 w-4 text-gray-400" />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle className="text-lg font-bold text-center">Vị trí</DialogTitle>
                        <DialogDescription className="sr-only">
                            Chọn vị trí của khách sạn trên bản đồ.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-4 space-y-4">
                        <div className="relative">
                            <div className="flex items-center bg-[#f1f3f6] rounded-xl px-4 h-12">
                                <Search className="h-5 w-5 text-gray-400 mr-2" />
                                <input
                                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400 font-medium"
                                    placeholder="Tìm kiếm vị trí"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <Navigation className="h-5 w-5 text-blue-500" />
                            </div>

                            {isSuggestionsOpen && suggestions.length > 0 && (
                                <div className="absolute z-[1001] mt-2 w-full rounded-xl border bg-white shadow-2xl max-h-[300px] overflow-y-auto ring-1 ring-black/5">
                                    {suggestions.map((s) => (
                                        <button
                                            key={s.place_id}
                                            className="flex w-full items-start gap-3 px-4 py-3 text-sm hover:bg-gray-50 text-left border-b last:border-0 transition-colors"
                                            onClick={() => selectSuggestion(s)}
                                        >
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" />
                                            <span className="font-medium text-gray-700">{s.description}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative h-[350px] w-full rounded-2xl overflow-hidden border shadow-inner bg-gray-50">
                            <div
                                ref={mapContainer}
                                className="absolute inset-0 w-full h-full"
                            />
                            {!map.current && !mapError && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 z-10">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-500 opacity-20" />
                                </div>
                            )}
                            {mapError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/90 z-20 text-center p-4">
                                    <MapPin className="h-10 w-10 text-gray-400 mb-2" />
                                    <p className="text-sm font-semibold text-red-500">{mapError}</p>
                                    <p className="text-xs text-gray-500 mt-1">Vui lòng kiểm tra lại cấu hình API Key.</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start gap-3 p-1">
                            <div className="p-2 bg-blue-50 rounded-full mt-0.5">
                                <MapPin className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Vị trí đã chọn:</p>
                                <p className="text-sm font-semibold text-gray-700 leading-tight">
                                    {tempLocation.address || 'Đang chọn vị trí...'}
                                </p>
                            </div>
                        </div>

                        <Button
                            className="w-full h-12 bg-[#3684FF] hover:bg-blue-600 rounded-2xl text-md font-bold text-white transition-all active:scale-[0.98] shadow-lg shadow-blue-200"
                            onClick={handleContinue}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

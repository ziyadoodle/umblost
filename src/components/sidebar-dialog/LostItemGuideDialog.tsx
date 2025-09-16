import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface LostItemGuideDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function LostItemGuideDialog({ open, onClose }: LostItemGuideDialogProps) {
    function handleOpenChange(open: boolean) {
        if (!open) {
            onClose();
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="bg-white flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-md">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4">Panduan Posting Barang Hilang</DialogTitle>
                    <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
                        <DialogDescription asChild>
                            <div className='p-6'>
                                <div className='[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold'>
                                    <div className='space-y-1'>
                                        <p className="text-justify font-medium">
                                            {/* <strong> */}
                                            Agar laporan barang hilang lebih mudah dipahami dan memudahkan proses pencarian, ikuti panduan berikut ketika membuat postingan:
                                            {/* </strong> */}
                                        </p>
                                    </div>
                                    <div className='space-y-1'>
                                        <p>
                                            <strong>Gunakan Nama Barang Saja</strong>
                                        </p>
                                        <p>
                                            Cukup tuliskan nama barang yang hilang, misalnya:
                                        </p>
                                        <ul>
                                            <li>&quot;Dompet&quot;</li>
                                            <li>&quot;Kunci Motor&quot;</li>
                                            <li>&quot;Tas Hitam&quot;</li>
                                        </ul>
                                    </div>
                                    <div className='space-y-1'>
                                        <p>
                                            <strong>Jangan Ungkapkan Ciri Unik Tersembunyi</strong>
                                        </p>
                                        <ul>
                                            <li>Simpan informasi detail/khusus (misalnya tanda di bagian dalam barang, nomor seri, atau isi dompet) hanya untuk proses verifikasi jika ada orang yang mengklaim menemukan barang.</li>
                                        </ul>
                                    </div>
                                    <div className='space-y-1'>
                                        <p>
                                            <strong>Tambahkan Foto (Opsional)</strong>
                                        </p>
                                        <ul>
                                            <li>Jika ada foto umum barang (bukan detail pribadi), silakan unggah untuk memudahkan identifikasi.</li>
                                            <li>Misalnya: gambar tas hitam secara umum, bukan foto isi dalamnya.</li>
                                        </ul>
                                    </div>
                                    <div className='space-y-1'>
                                        <p>
                                            <strong>⚠️Catatan Penting</strong>
                                        </p>
                                        <p>Informasi detail barang akan digunakan nanti saat verifikasi klaim dari pihak yang menemukan. Dengan begitu, kamu bisa memastikan barang benar-benar milikmu.</p>
                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                        <DialogFooter className='px-6 pb-6 sm:justify-end'>
                            <DialogClose asChild>
                                <Button variant='outline'>
                                    <ChevronLeftIcon />
                                    Back
                                </Button>
                            </DialogClose>
                            <Button type='button'>Read More</Button>
                        </DialogFooter>
                    </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
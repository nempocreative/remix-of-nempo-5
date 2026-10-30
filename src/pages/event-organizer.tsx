import { Layout } from "@/components/layout";
import { Settings, BarChart3, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventOrganizerPage() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard EO</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                 <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500 font-medium">Event Aktif</p>
           </div>
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="bg-green-50 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                 <Users className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">1,205</p>
              <p className="text-xs text-gray-500 font-medium">Total Peserta</p>
           </div>
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 col-span-2">
              <div className="bg-purple-50 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                 <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">Rp 45.500.000</p>
              <p className="text-xs text-gray-500 font-medium">Total Pendapatan Tiket</p>
           </div>
        </div>

        <h3 className="font-bold text-gray-900 text-lg mb-4">Manajemen Event</h3>
        
        <div className="flex flex-col gap-3">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex justify-between items-center">
              <div>
                 <h4 className="font-bold text-sm text-gray-900 mb-1">Festival Budaya Jawa Barat</h4>
                 <p className="text-xs text-gray-500">15 Aug 2024 • 500 Peserta</p>
              </div>
              <Button size="icon" variant="outline" className="rounded-xl h-10 w-10"><Settings className="h-4 w-4" /></Button>
           </div>
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex justify-between items-center">
              <div>
                 <h4 className="font-bold text-sm text-gray-900 mb-1">Konser Musik Alam</h4>
                 <p className="text-xs text-gray-500">22 Aug 2024 • 705 Peserta</p>
              </div>
              <Button size="icon" variant="outline" className="rounded-xl h-10 w-10"><Settings className="h-4 w-4" /></Button>
           </div>
           
           <Button className="w-full mt-4 rounded-xl py-6 border-dashed bg-gray-50 text-primary border-primary/30 hover:bg-primary/5 shadow-none">
              + Buat Event Baru
           </Button>
        </div>

      </div>
    </Layout>
  );
}

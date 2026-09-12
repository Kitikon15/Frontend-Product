import "./App.css";
import { useState, useEffect } from "react";
import { Package, Pencil, Trash2, PlusCircle, X, Loader2, Sparkles, Tag } from "lucide-react";

function App() {
  const API_URL = import.meta.env.VITE_API_URL + "/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, price: Number(price) }),
      });
      if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      setName("");
      setPrice("");
      fetchProduct();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: Number(price) }),
      });
      if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingId
            ? { ...product, name: name, price: Number(price) }
            : product,
        ),
      );
      cancelEditing();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการลบข้อมูล");

      setProducts((current) => current.filter((item) => item.id !== id));
      if (editingId === id) cancelEditing();
    } catch (error) {
      alert(error.message);
    }
  };

  const startEditingProduct = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
  };

  const cancelEditing = () => {
    setName("");
    setPrice("");
    setEditingId(null);
  };

  return (
    <main className="min-h-screen bg-[#0a0f1d] bg-gradient-to-br from-slate-950 via-[#0a1120] to-[#04161b] px-4 py-10 font-sans text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header Hero Section */}
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
                <Sparkles className="size-3.5" />
                Executive Dashboard
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Product <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Management</span>
              </h1>
              <p className="text-sm text-slate-400 sm:text-base">
                ศูนย์กลางจัดการสต็อกสินค้าและราคาแบบเรียลไทม์
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-5 py-3.5 backdrop-blur-md">
              <div className="rounded-xl bg-emerald-500/20 p-3 text-emerald-400">
                <Package className="size-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">สินค้าในระบบ</p>
                <p className="text-2xl font-bold tracking-tight text-white">
                  {products.length} <span className="text-xs font-normal text-slate-400">รายการ</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Form Card Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 text-slate-950 shadow-lg shadow-emerald-500/20">
              {editingId ? <Pencil className="size-5" /> : <PlusCircle className="size-5" />}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {editingId ? "แก้ไขรายละเอียดสินค้า" : "เพิ่มสินค้าใหม่เข้าคลัง"}
              </h2>
              <p className="text-xs text-slate-400">
                {editingId ? "ปรับปรุงข้อมูลสินค้าที่เลือก" : "ระบุข้อมูลชื่อและราคาสินค้าให้ครบถ้วน"}
              </p>
            </div>
          </div>

          <form
            onSubmit={editingId ? handleUpdateProduct : handleCreateProduct}
            className="grid grid-cols-1 gap-5 md:grid-cols-[1.5fr_1fr_auto] md:items-end"
          >
            <div className="space-y-2">
              <label className="text-xs font-medium tracking-wide text-slate-300">
                ชื่อสินค้า <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="เช่น Custom Mechanical Keyboard"
                  className="w-full rounded-xl border border-white/10 bg-slate-800/60 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition duration-200 outline-none focus:border-emerald-400 focus:bg-slate-800 focus:ring-2 focus:ring-emerald-400/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium tracking-wide text-slate-300">
                ราคา (บาท) <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="เช่น 2890"
                  className="w-full rounded-xl border border-white/10 bg-slate-800/60 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition duration-200 outline-none focus:border-emerald-400 focus:bg-slate-800 focus:ring-2 focus:ring-emerald-400/20"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11.5 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:from-emerald-400 hover:to-teal-400 hover:shadow-emerald-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-slate-950" />
                    <span>กำลังบันทึก...</span>
                  </>
                ) : (
                  <>
                    {editingId ? <Pencil className="size-4" /> : <PlusCircle className="size-4" />}
                    <span>{editingId ? "บันทึกการแก้ไข" : "บันทึกข้อมูล"}</span>
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="inline-flex h-11.5 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                >
                  <X className="size-4" />
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Alert Error */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300 backdrop-blur-md">
            เกิดข้อผิดพลาด: {error}
          </div>
        )}

        {/* Data List Table Section */}
        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md">
            <Loader2 className="size-8 animate-spin text-emerald-400" />
            <p className="text-sm tracking-wide text-slate-400">กำลังเชื่อมต่อฐานข้อมูล...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900/30 p-12 text-center backdrop-blur-md">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/5 text-slate-500">
              <Package className="size-8" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">ยังไม่มีรายการสินค้า</h3>
            <p className="mt-1 text-sm text-slate-400">เริ่มต้นเพิ่มรายการสินค้าแรกด้านบน</p>
          </div>
        ) : (
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    <th className="py-4.5 pl-6 pr-4">รหัส</th>
                    <th className="py-4.5 px-4">สินค้า</th>
                    <th className="py-4.5 px-4">ราคาต่อชิ้น</th>
                    <th className="py-4.5 pl-4 pr-6 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((item) => (
                    <tr
                      key={item.id}
                      className="group transition-colors duration-150 hover:bg-white/[0.03]"
                    >
                      <td className="py-4 pl-6 pr-4 font-mono text-xs text-slate-500">
                        #{item.id}
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-200 group-hover:text-white">
                        {item.name}
                      </td>
                      <td className="py-4 px-4 font-semibold text-emerald-400">
                        {Number(item.price).toLocaleString()} <span className="text-xs font-normal text-slate-400">บาท</span>
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => startEditingProduct(item)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-500/10 hover:text-emerald-400"
                            title="แก้ไข"
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item.id)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400"
                            title="ลบ"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

export default App;
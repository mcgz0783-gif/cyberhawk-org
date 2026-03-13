import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { BookOpen, Plus, Upload, X, Image, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EbookForm {
  title: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  author: string;
  page_count: string;
  sort_order: string;
  is_published: boolean;
  is_featured: boolean;
}

const emptyForm: EbookForm = {
  title: "",
  slug: "",
  description: "",
  price: "0",
  category: "",
  author: "",
  page_count: "",
  sort_order: "0",
  is_published: false,
  is_featured: false,
};

export default function AdminEbooks() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EbookForm>(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const coverRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchEbooks = async () => {
    const { data } = await supabase.from("ebooks").select("*").order("created_at", { ascending: false });
    setEbooks(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEbooks(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setCoverFile(null);
    setPdfFile(null);
    setCoverPreview(null);
    setDialogOpen(true);
  };

  const openEdit = (eb: any) => {
    setEditingId(eb.id);
    setForm({
      title: eb.title,
      slug: eb.slug,
      description: eb.description,
      price: String(eb.price),
      category: eb.category || "",
      author: eb.author || "",
      page_count: eb.page_count ? String(eb.page_count) : "",
      sort_order: String(eb.sort_order),
      is_published: eb.is_published,
      is_featured: eb.is_featured,
    });
    setCoverPreview(eb.cover_url || null);
    setCoverFile(null);
    setPdfFile(null);
    setDialogOpen(true);
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfFile(file);
  };

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const uploadFile = async (bucket: string, path: string, file: File) => {
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast({ title: "Title and description are required", variant: "destructive" });
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    try {
      const slug = form.slug || slugify(form.title);
      let cover_url = coverPreview;
      let file_path: string | null = null;
      let file_size: number | null = null;

      // Upload cover image
      if (coverFile) {
        setUploadProgress(30);
        const ext = coverFile.name.split(".").pop();
        const coverPath = `covers/${slug}.${ext}`;
        cover_url = await uploadFile("public-ebooks", coverPath, coverFile);
      }

      // Upload PDF
      if (pdfFile) {
        setUploadProgress(60);
        const pdfPath = `pdfs/${slug}.pdf`;
        const { error } = await supabase.storage.from("ebooks-purchase").upload(pdfPath, pdfFile, {
          cacheControl: "3600",
          upsert: true,
        });
        if (error) throw error;
        file_path = pdfPath;
        file_size = pdfFile.size;
      }

      setUploadProgress(80);

      const record: any = {
        title: form.title,
        slug,
        description: form.description,
        price: parseInt(form.price) || 0,
        category: form.category || null,
        author: form.author || null,
        page_count: form.page_count ? parseInt(form.page_count) : null,
        sort_order: parseInt(form.sort_order) || 0,
        is_published: form.is_published,
        is_featured: form.is_featured,
        cover_url,
      };

      if (file_path) {
        record.file_path = file_path;
        record.file_size = file_size;
      }

      if (editingId) {
        const { error } = await supabase.from("ebooks").update(record).eq("id", editingId);
        if (error) throw error;
        toast({ title: "Ebook updated" });
      } else {
        const { error } = await supabase.from("ebooks").insert(record);
        if (error) throw error;
        toast({ title: "Ebook created" });
      }

      setUploadProgress(100);
      setDialogOpen(false);
      fetchEbooks();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this ebook?")) return;
    await supabase.from("ebooks").delete({ count: "exact" }).eq("id", id);
    toast({ title: "Deleted" });
    fetchEbooks();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("ebooks").update({ is_published: !current }).eq("id", id);
    toast({ title: current ? "Unpublished" : "Published" });
    fetchEbooks();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <SectionLabel>// CONTENT MANAGEMENT</SectionLabel>
          <h1 className="font-display text-3xl font-700 mt-2">
            <GlowText>EBOOKS</GlowText>
          </h1>
        </div>
        <CyberButton onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add Ebook
        </CyberButton>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : ebooks.length === 0 ? (
        <div className="bg-card border border-border p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-mono text-sm">No ebooks yet.</p>
          <CyberButton className="mt-4" onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Create First Ebook</CyberButton>
        </div>
      ) : (
        <div className="space-y-3">
          {ebooks.map((eb) => (
            <div key={eb.id} className="bg-card border border-border p-4 flex items-center gap-4">
              <div className="w-16 h-20 bg-secondary/30 border border-border flex-shrink-0 overflow-hidden">
                {eb.cover_url ? (
                  <img src={eb.cover_url} alt={eb.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><BookOpen className="h-6 w-6 text-muted-foreground/30" /></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-600 truncate">{eb.title}</h3>
                  <span className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-widest flex-shrink-0 ${eb.is_published ? "text-primary border-primary/30 bg-primary/10" : "text-muted-foreground border-border bg-muted/20"}`}>
                    {eb.is_published ? "LIVE" : "DRAFT"}
                  </span>
                  {eb.file_path && <span title="PDF uploaded"><FileText className="h-3.5 w-3.5 text-primary/60 flex-shrink-0" /></span>}
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  ${(eb.price / 100).toFixed(2)} · {eb.category || "Uncategorized"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <CyberButton size="sm" variant="ghost" onClick={() => openEdit(eb)}>Edit</CyberButton>
                <CyberButton size="sm" variant="outline" onClick={() => togglePublish(eb.id, eb.is_published)}>
                  {eb.is_published ? "Unpublish" : "Publish"}
                </CyberButton>
                <CyberButton size="sm" variant="danger" onClick={() => handleDelete(eb.id)}>Delete</CyberButton>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              <GlowText>{editingId ? "EDIT" : "CREATE"} EBOOK</GlowText>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-mono text-xs text-muted-foreground">Title *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })} className="bg-secondary/30 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-xs text-muted-foreground">Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-secondary/30 border-border" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">Description *</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-secondary/30 border-border min-h-[80px]" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="font-mono text-xs text-muted-foreground">Price (cents)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-secondary/30 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-xs text-muted-foreground">Category</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-secondary/30 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-xs text-muted-foreground">Author</Label>
                <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="bg-secondary/30 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-xs text-muted-foreground">Pages</Label>
                <Input type="number" value={form.page_count} onChange={(e) => setForm({ ...form, page_count: e.target.value })} className="bg-secondary/30 border-border" />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">Cover Image</Label>
              <div className="flex items-start gap-4">
                <div
                  className="w-32 h-40 bg-secondary/30 border border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden"
                  onClick={() => coverRef.current?.click()}
                >
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Image className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                      <span className="font-mono text-[10px] text-muted-foreground">Upload</span>
                    </div>
                  )}
                </div>
                {coverPreview && (
                  <CyberButton size="sm" variant="ghost" onClick={() => { setCoverFile(null); setCoverPreview(null); }}>
                    <X className="h-3 w-3" />
                  </CyberButton>
                )}
              </div>
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverSelect} />
            </div>

            {/* PDF Upload */}
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">PDF File</Label>
              <div
                className="border border-dashed border-border p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => pdfRef.current?.click()}
              >
                {pdfFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-mono text-sm text-foreground">{pdfFile.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">({(pdfFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                    <span className="font-mono text-xs text-muted-foreground">Click to upload PDF</span>
                  </div>
                )}
              </div>
              <input ref={pdfRef} type="file" accept=".pdf" className="hidden" onChange={handlePdfSelect} />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-[hsl(var(--primary))]" />
                <span className="font-mono text-xs text-muted-foreground">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-[hsl(var(--primary))]" />
                <span className="font-mono text-xs text-muted-foreground">Featured</span>
              </label>
            </div>

            {uploading && <Progress value={uploadProgress} className="h-1" />}

            <div className="flex justify-end gap-3 pt-2">
              <CyberButton variant="ghost" onClick={() => setDialogOpen(false)} disabled={uploading}>Cancel</CyberButton>
              <CyberButton onClick={handleSave} disabled={uploading}>
                {uploading ? "Uploading..." : editingId ? "Save Changes" : "Create Ebook"}
              </CyberButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

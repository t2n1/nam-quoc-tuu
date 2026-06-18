import { supabase } from './supabaseClient';
import { Product, Distributor, ProcessStep, SiteContent, BlogPost, Testimonial, FAQItem, ContactRequest } from './types';

export const supabaseService = {
    // 1. Site Content
    async getSiteContent(): Promise<SiteContent | null> {
        const { data, error } = await supabase.from('site_content').select('content').eq('id', 1).single();
        if (error) return null;
        return data.content as SiteContent;
    },

    async updateSiteContent(content: SiteContent) {
        const { error } = await supabase.from('site_content').upsert({ id: 1, content, updated_at: new Date().toISOString() });
        if (error) throw error;
    },

    // 2. Products
    async getProducts(): Promise<Product[]> {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        return data || [];
    },

    async saveProduct(product: Product) {
        const { error } = await supabase.from('products').upsert(product);
        if (error) throw error;
    },

    async deleteProduct(id: string) {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
    },

    // 3. Distributors
    async getDistributors(): Promise<Distributor[]> {
        const { data, error } = await supabase.from('distributors').select('*');
        if (error) throw error;
        return data || [];
    },

    async saveDistributor(distributor: Distributor) {
        const { error } = await supabase.from('distributors').upsert(distributor);
        if (error) throw error;
    },

    async deleteDistributor(phone: string) {
        const { error } = await supabase.from('distributors').delete().eq('phone', phone);
        if (error) throw error;
    },

    // 4. Blog Posts
    async getBlogPosts(): Promise<BlogPost[]> {
        const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    async saveBlogPost(post: BlogPost) {
        const { error } = await supabase.from('blog_posts').upsert(post);
        if (error) throw error;
    },

    async deleteBlogPost(id: string) {
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (error) throw error;
    },

    // 5. Testimonials
    async getTestimonials(): Promise<Testimonial[]> {
        const { data, error } = await supabase.from('testimonials').select('*');
        if (error) throw error;
        return data || [];
    },

    async saveTestimonial(testimonial: Testimonial) {
        const { error } = await supabase.from('testimonials').upsert(testimonial);
        if (error) throw error;
    },

    async deleteTestimonial(id: string) {
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) throw error;
    },

    // 6. FAQs
    async getFaqs(): Promise<FAQItem[]> {
        const { data, error } = await supabase.from('faqs').select('*');
        if (error) throw error;
        return data || [];
    },

    async saveFaq(faq: FAQItem) {
        const { error } = await supabase.from('faqs').upsert(faq);
        if (error) throw error;
    },

    async deleteFaq(question: string) {
        const { error } = await supabase.from('faqs').delete().eq('question', question);
        if (error) throw error;
    },

    // 7. Contacts
    async getContacts(): Promise<ContactRequest[]> {
        const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    },

    async saveContact(contact: ContactRequest) {
        const { error } = await supabase.from('contacts').upsert(contact);
        if (error) throw error;
    },

    async deleteContact(id: string) {
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (error) throw error;
    },


};

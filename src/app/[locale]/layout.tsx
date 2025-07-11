import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const LocaleLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) => {
    const { locale } = await params;

    return (
        <>
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
        </>
    );
};

export default LocaleLayout;

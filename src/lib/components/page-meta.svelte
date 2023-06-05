<script>
	export let title = "";
	export let pageCanonicalUrl = "";
	export let pageMetaDescription = "";

	export const baseUrl = "https://make-bookmarklets.com";
	export const ogImage = "/default-og-image.webp";
	export const twitterImage = "/default-twitter-image.webp";

	export let seo = {
		title: "Make Bookmarklets · Make It Easy",
		description:
			"A bookmarklet generator which is clean and easy to use. Create and test bookmarklets in your browser. Extend your browsing experience any way you see fit.",
		canonical: baseUrl,
	};

	$: pageTitle = title !== "" ? `Make Bookmarklets · ${title}` : seo.title;
	$: canonicalUrl = `${baseUrl}${pageCanonicalUrl}` ?? seo.canonical;
	$: metaDescription =
		pageMetaDescription !== "" ? pageMetaDescription : seo.description;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link
		rel="preload"
		href="/fonts/LexendDeca-Bold.woff2"
		as="font"
		type="font/woff2"
	/>
	<link
		rel="preload"
		href="/fonts/LexendDeca-ExtraLight.woff2"
		as="font"
		type="font/woff2"
	/>
	<link
		rel="preload"
		href="/fonts/LexendDeca-Regular.woff2"
		as="font"
		type="font/woff2"
	/>
	<link rel="preload" as="image" href="/flat-bookmark.svg" />
	<meta name="description" content={metaDescription} />
	<!-- Open Graph -->
	<meta content="Make Bookmarklets" property="og:site_name" />
	<meta content="Make Bookmarklets · Make It Easey" property="og:title" />
	<meta content="website" property="og:type" />
	<meta content={seo.description} property="og:description" />
	<meta content={baseUrl} property="og:url" />
	<meta content={baseUrl + ogImage} property="og:image" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@CullanLuther" />
	<meta content="Make Bookmarklets · Make It Easy" property="twitter:title" />
	<meta content={seo.description} property="twitter:description" />
	<meta name="twitter:creator" content="@CullanLuther" />
	<meta content={baseUrl + twitterImage} property="twitter:image" />
	<meta name="color-scheme" content="#ec6e89" />
	<meta
		name="color-scheme"
		media="(prefers-color-scheme: dark)"
		content="#ec6e89"
	/>
	<link rel="canonical" href={canonicalUrl} />
</svelte:head>

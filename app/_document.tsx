import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add custom head tags here */}
        </Head>
        <body className={inter.className}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

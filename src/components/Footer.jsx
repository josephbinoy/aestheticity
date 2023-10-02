'use client';

import { Footer } from 'flowbite-react';

export default function MyFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="#"
            name="aestheticity"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">
              About
            </Footer.Link>
            <Footer.Link href="#">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#">
              Licensing
            </Footer.Link>
            <Footer.Link href="#">
              Contact
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider className='bg-gray-900 text-gray-900' />
        <Footer.Copyright
          by="aestheticity"
          href="#"
          year={2023}
        />
      </div>
    </Footer>
  )
}



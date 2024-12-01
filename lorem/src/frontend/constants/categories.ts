import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Header,
} from "@tanstack/react-table"

export const category = {
  category: "Tech and Software",
  subcategory: "AI and ML",
  name: "Some SAAS and Cloud Thingy",
  patentNumber: "US 1959596487",
  image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
  company: "IBM",
  patentDate: "March 21, 2021",
  description:"Lorem ipsum dolor sit amet consectetur. Ullamcorper ut lectus at quis sit tempor sem cras. Tortor quam congue et nec mi porttitor arcu posuere. Morbi turpis varius lacus non tincidunt pellentesque. Magna aliquet nec est quis dictum in. Urna netus eget id vulputate id in venenatis ridiculus. Maecenas feugiat id porta mi ut condimentum enim hendrerit ligula. Aliquam cras commodo nisi pellentesque. Id suspendisse scelerisque congue vulputate sit ullamcorper morbi sem. Eget placerat tincidunt morbi scelerisque dictumst eu ut sollicitudin urna.",
  pdfLink: "https://s203.q4cdn.com/998886067/files/doc_financials/2023/ar/2023-annual-report-final.pdf"
}

export const categories = [
    {
      title: "Tech and Software",
      items: [
        { name: "AI and ML", description: "New patents in the AI and ML",
          patents: [
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMRtes3i4juk3GUkzLM3gD0J6joco5KjfDg&s",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAuOblPA3i5xMmxSxN-KoGUfSShVgoUWGkPg&s",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
          ]
        },
        { name: "Blockchain and Crypto", description: "Lastest",
          patents: [
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMRtes3i4juk3GUkzLM3gD0J6joco5KjfDg&s",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAuOblPA3i5xMmxSxN-KoGUfSShVgoUWGkPg&s",
              company: "IBM"
            },
            {
              name: "Some SAAS and Cloud Thingy",
              patentNumber: "US 1959596487",
              image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
              company: "IBM"
            },
          ]
        },
  
      ],
    },
    {
      title: "Energy and Environment",
      items: [
        { name: "Renewable", description: "Carbon Footprint",  patents: [
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMRtes3i4juk3GUkzLM3gD0J6joco5KjfDg&s",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAuOblPA3i5xMmxSxN-KoGUfSShVgoUWGkPg&s",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
        ] },
        { name: "Water-Based", description: "Clean Water",  patents: [
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMRtes3i4juk3GUkzLM3gD0J6joco5KjfDg&s",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAuOblPA3i5xMmxSxN-KoGUfSShVgoUWGkPg&s",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
        ] },
      ],
    },
    {
      title: "Misc. and Emerging",
      items: [
        { name: "AI Models", description: "Latest Technology",  patents: [
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMRtes3i4juk3GUkzLM3gD0J6joco5KjfDg&s",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAuOblPA3i5xMmxSxN-KoGUfSShVgoUWGkPg&s",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
        ] },
        { name: "Automation", description: "Hardware", patents: [
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMRtes3i4juk3GUkzLM3gD0J6joco5KjfDg&s",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAuOblPA3i5xMmxSxN-KoGUfSShVgoUWGkPg&s",
            company: "IBM"
          },
          {
            name: "Some SAAS and Cloud Thingy",
            patentNumber: "US 1959596487",
            image: "https://www.drugpatentwatch.com/blog/wp-content/uploads/2017/10/image.png",
            company: "IBM"
          },
        ] },
      ],
    },
  ];


  type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }  

  export const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ]

   
  export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
  ]

  
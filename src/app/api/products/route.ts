import { NextResponse, NextRequest } from "next/server";

const Products = [
  { id: 1, name: "Product 1", category: "Category A" },
  { id: 2, name: "Product 2", category: "Category B" },
  { id: 3, name: "Product 3", category: "Category A" },
  { id: 4, name: "Product 4", category: "Category C" },
  { id: 5, name: "Product 5", category: "Category B" },
  { id: 6, name: "Product 6", category: "Category A" },
  { id: 7, name: "Product 7", category: "Category C" },
  { id: 8, name: "Product 8", category: "Category B" },
  { id: 9, name: "Product 9", category: "Category A" },
  { id: 10, name: "Product 10", category: "Category C" },
  { id: 11, name: "Product 11", category: "Category A" },
  { id: 12, name: "Product 12", category: "Category B" },
  { id: 13, name: "Product 13", category: "Category A" },
  { id: 14, name: "Product 14", category: "Category C" },
  { id: 15, name: "Product 15", category: "Category B" },
  { id: 16, name: "Product 16", category: "Category A" },
  { id: 17, name: "Product 17", category: "Category C" },
  { id: 18, name: "Product 18", category: "Category B" },
  { id: 19, name: "Product 19", category: "Category A" },
  { id: 20, name: "Product 20", category: "Category C" },
];

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = req.nextUrl;
    const limit = searchParams.get("limit");
    const search = searchParams.get("search");

    // Validate 'limit' query parameter (must be a positive integer)
    if (limit && isNaN(Number(limit))) {
      return NextResponse.json(
        { error: "Invalid limit value. It must be a number." },
        { status: 400 }
      );
    }

    // Parse 'limit' and 'search'
    const parsedLimit = limit ? parseInt(limit, 10) : 6; // Default limit to 6 if not provided
    const parsedSearch = search || ""; // Default search to empty string if not provided

    // Validate 'limit' to be a positive number
    if (parsedLimit <= 0) {
      return NextResponse.json(
        { error: "Limit must be a positive integer." },
        { status: 400 }
      );
    }

    // Filter the items based on the search query (if any)
    const filteredItems = Products.filter((item) =>
      item.name.toLowerCase().includes(parsedSearch.toLowerCase())
    );

    // Paginate based on the limit
    const paginatedItems = filteredItems.slice(0, parsedLimit);

    // If no items are found, return a 404 response
    if (paginatedItems.length === 0) {
      return NextResponse.json(
        { error: "No items found matching the search criteria." },
        { status: 404 }
      );
    }

    // Return the filtered and paginated items as a JSON response
    return NextResponse.json(paginatedItems);
  } catch (error) {
    // Catch any unexpected errors and return a 500 status with a message
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

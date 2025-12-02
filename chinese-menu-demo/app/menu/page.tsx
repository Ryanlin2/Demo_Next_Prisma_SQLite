// app/menu/page.tsx
import { prisma } from "@/lib/prisma";

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: { id: "asc" },
      },
    },
  });

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Chinese Restaurant Menu
      </h1>

      {categories.map((category) => (
        <section key={category.id} className="mb-10">
          <h2 className="text-2xl font-semibold mb-1">{category.name}</h2>
          {category.description && (
            <p className="text-sm text-gray-500 mb-3">{category.description}</p>
          )}

          <div className="space-y-3">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-gray-200 pb-2"
              >
                <div>
                  <div className="font-medium flex items-baseline gap-2">
                    <span>{item.name}</span>
                    {item.chineseName && (
                      <span className="text-sm text-gray-500">
                        ({item.chineseName})
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                  {item.spiceLevel && (
                    <span className="inline-block text-xs mt-1 px-2 py-0.5 rounded-full border border-red-400 text-red-500 uppercase">
                      {item.spiceLevel}
                    </span>
                  )}
                </div>
                <div className="font-semibold">
                  ${Number(item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductPage = () => {
  return (
    <div className="border border-red-500 p-5">
      <h1 className="text-red-300">ProductPage</h1>
      <Button className="mb-4">Hello World</Button>
      <Input placeholder="Lets start this project"></Input>
    </div>
  );
};

export default ProductPage;

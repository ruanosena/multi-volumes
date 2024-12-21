import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Config } from "./components/configuracoes";

function App() {
  return (
    <>
      <Config />

      <Tabs defaultValue="">
        <TabsList className="w-full">
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="0"
          >
            0
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="1"
          >
            1
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="2"
          >
            2
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="3"
          >
            3
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="4"
          >
            4
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="5"
          >
            5
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="6"
          >
            6
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="7"
          >
            7
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="8"
          >
            8
          </TabsTrigger>
          <TabsTrigger
            className="flex items-baseline text-sm tracking-wider text-gray-950 before:text-sm before:text-gray-300 xs:text-lg sm:text-xl sm:before:content-['XX'] md:before:content-['XXXX'] lg:before:text-base"
            value="9"
          >
            9
          </TabsTrigger>
        </TabsList>
        <TabsContent value="0">Pedidos terminados em 0</TabsContent>
        <TabsContent value="1">Pedidos terminados em 1</TabsContent>
        <TabsContent value="2">Pedidos terminados em 2</TabsContent>
        <TabsContent value="3">Pedidos terminados em 3</TabsContent>
        <TabsContent value="4">Pedidos terminados em 4</TabsContent>
        <TabsContent value="5">Pedidos terminados em 5</TabsContent>
        <TabsContent value="6">Pedidos terminados em 6</TabsContent>
        <TabsContent value="7">Pedidos terminados em 7</TabsContent>
        <TabsContent value="8">Pedidos terminados em 8</TabsContent>
        <TabsContent value="9">Pedidos terminados em 9</TabsContent>
      </Tabs>
    </>
  );
}

export default App;

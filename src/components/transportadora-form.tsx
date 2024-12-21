import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Transportadora } from "@/lib/classes";
import { useEffect } from "react";

const formSchema = z.object({
  nome: z.string().min(1),
  sigla: z.string().min(1).max(3).toUpperCase(),
  horaDeCorte: z.string(),
});

interface Props {
  transportadoraAtiva?: Transportadora;
  onChange: (transportadora?: Transportadora) => void;
}

export function TransportadoraForm({ onChange, transportadoraAtiva }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      sigla: "",
      horaDeCorte: "",
    },
  });

  useEffect(() => {
    if (transportadoraAtiva) {
      form.setValue("nome", transportadoraAtiva.nome);
      form.setValue("sigla", transportadoraAtiva.sigla);
      if (transportadoraAtiva.horaDeCorte) {
        const date = new Date(transportadoraAtiva.horaDeCorte);
        form.setValue(
          "horaDeCorte",
          `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`,
        );
      } else {
        form.resetField("horaDeCorte");
      }
    } else {
      form.reset();
    }
  }, [form, transportadoraAtiva]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.horaDeCorte) {
      const time = values.horaDeCorte.split(":");
      const date = new Date();
      onChange(
        new Transportadora(
          values.nome,
          values.sigla,
          date.setHours(+time[0], +time[1]),
        ),
      );
    } else {
      onChange(new Transportadora(values.nome, values.sigla));
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Correios" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sigla"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sigla</FormLabel>
              <FormControl>
                <Input placeholder="CO" maxLength={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="horaDeCorte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora de corte</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {transportadoraAtiva && (
          <Button
            type="button"
            variant="destructive"
            className="mr-4"
            onClick={() => onChange(undefined)}
          >
            Remover
          </Button>
        )}
        <Button type="submit">
          {transportadoraAtiva ? "Atualizar" : "Adicionar"}
        </Button>
      </form>
    </Form>
  );
}

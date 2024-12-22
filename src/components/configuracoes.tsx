import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useConfiguracoes } from "@/contexts/configuracoesContext";
import { TransportadoraForm } from "./transportadora-form";
import { useCallback, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Transportadora } from "@/lib/classes";

export function Config() {
  const {
    dialogoAberto,
    setDialogoAberto,
    addTransportadora,
    updateTransportadora,
    removeTransportadora,
    transportadoras,
    updateConfig,
  } = useConfiguracoes();
  const [adicionandoTransportadora, setAdicionandoTransportadora] =
    useState(false);
  const [transportadoraEditando, setTransportadoraEditando] =
    useState<Transportadora>();

  const handleToggleTransportadora = useCallback(
    (transportadora?: Transportadora) => {
      if (transportadora && transportadoraEditando === transportadora) {
        setTransportadoraEditando(undefined);
        setAdicionandoTransportadora(false);
      } else {
        setTransportadoraEditando(transportadora);
        setAdicionandoTransportadora((prevState) =>
          prevState && !transportadora ? false : !transportadora,
        );
      }
    },
    [transportadoraEditando],
  );

  const handleChangeTransportadora = useCallback(
    (transportadora?: Transportadora) => {
      if (transportadoraEditando) {
        if (!transportadora) removeTransportadora(transportadoraEditando);
        else updateTransportadora(transportadoraEditando, transportadora);
      } else {
        addTransportadora(transportadora!);
      }
      setAdicionandoTransportadora(false);
    },
    [
      transportadoraEditando,
      addTransportadora,
      removeTransportadora,
      updateTransportadora,
    ],
  );

  return (
    <Dialog open={dialogoAberto}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setDialogoAberto(true)}>
          Configurações
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>Adicionar transportadoras</DialogDescription>
        </DialogHeader>
        <div className="flex items-baseline justify-between bg-gray-100">
          <span className="pl-2 font-medium">Transportadoras</span>
          <Button
            onClick={() => handleToggleTransportadora()}
            variant="outline"
            size="icon"
            className="bg-white/75 hover:bg-white"
          >
            {adicionandoTransportadora &&
            transportadoraEditando === undefined ? (
              <Minus />
            ) : (
              <Plus />
            )}
          </Button>
        </div>
        <div className="flex flex-wrap -space-x-1">
          {transportadoras.map((t, i) => (
            <Avatar
              key={t.nome + i}
              className="cursor-pointer transition-all hover:!ml-0 [&:not(:last-child)]:hover:!mr-1"
              onClick={() => handleToggleTransportadora(t)}
            >
              <AvatarFallback>{t.sigla}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        {(adicionandoTransportadora || transportadoraEditando) && (
          <TransportadoraForm
            transportadoraAtiva={transportadoraEditando}
            onChange={handleChangeTransportadora}
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-base"
              onClick={() => {
                setDialogoAberto(false);
                setAdicionandoTransportadora(false);
                updateConfig();
              }}
            >
              Concluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, Phone, MapPin, Calendar, Heart } from 'lucide-react';

interface PatientFormData {
  susNumber: string;
  fullName: string;
  phone: string;
  address: string;
  neighborhood: string;
  birthDate: string;
}

const PatientRegistration = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    susNumber: '',
    fullName: '',
    phone: '',
    address: '',
    neighborhood: '',
    birthDate: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mask for phone number (XX) XXXXX-XXXX
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return value;
  };

  // Mask for birth date DD/MM/AAAA
  const formatDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : !match[3] ? `${match[1]}/${match[2]}` : `${match[1]}/${match[2]}/${match[3]}`;
    }
    return value;
  };

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    let formattedValue = value;
    
    if (field === 'phone') {
      formattedValue = formatPhone(value);
    } else if (field === 'birthDate') {
      formattedValue = formatDate(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields = Object.values(formData);
    const isEmpty = requiredFields.some(field => !field.trim());
    
    if (isEmpty) {
      toast.error('Todos os campos são obrigatórios');
      return false;
    }
    
    // Validate phone format
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Formato de telefone inválido');
      return false;
    }
    
    // Validate date format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(formData.birthDate)) {
      toast.error('Formato de data inválido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://n8n.mentoriajrs.com/webhook-test/receber-dados-cadastrojrs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numeroSUS: formData.susNumber,
          nomeCompleto: formData.fullName,
          telefone: formData.phone,
          endereco: formData.address,
          bairro: formData.neighborhood,
          dataNascimento: formData.birthDate,
          timestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        toast.success('Paciente cadastrado com sucesso!');
        // Reset form
        setFormData({
          susNumber: '',
          fullName: '',
          phone: '',
          address: '',
          neighborhood: '',
          birthDate: ''
        });
      } else {
        throw new Error('Erro no servidor');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Erro ao cadastrar paciente. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            Cadastro de Pacientes
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Preencha os dados do paciente com atenção
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="susNumber" className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Número do SUS
                </Label>
                <Input
                  id="susNumber"
                  type="text"
                  placeholder="Digite o número do SUS"
                  value={formData.susNumber}
                  onChange={(e) => handleInputChange('susNumber', e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                  aria-label="Número do SUS do paciente"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nome Completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nome completo do paciente"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                  aria-label="Nome completo do paciente"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(XX) XXXXX-XXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  maxLength={15}
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                  aria-label="Número de telefone do paciente"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Data de Nascimento
                </Label>
                <Input
                  id="birthDate"
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  maxLength={10}
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                  aria-label="Data de nascimento do paciente"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Endereço Completo
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Rua, número, complemento"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary/20"
                aria-label="Endereço completo do paciente"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="neighborhood" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Bairro
              </Label>
              <Input
                id="neighborhood"
                type="text"
                placeholder="Digite o bairro"
                value={formData.neighborhood}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary/20"
                aria-label="Bairro do paciente"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary-foreground hover:from-primary/90 hover:to-primary-foreground/90 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Paciente'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientRegistration;
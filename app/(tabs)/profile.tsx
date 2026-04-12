import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Alert } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useUserProfile } from '@/lib/user-profile-context';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

export default function ProfileScreen() {
  const { profile, updateProfile, addEmergencyContact, deleteEmergencyContact } = useUserProfile();
  const colors = useColors();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);

  // Personal info form state
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth || '');
  const [bloodType, setBloodType] = useState(profile?.bloodType || '');
  const [allergies, setAllergies] = useState(profile?.allergies || '');
  const [medicalConditions, setMedicalConditions] = useState(profile?.medicalConditions || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [city, setCity] = useState(profile?.city || '');
  const [state, setState] = useState(profile?.state || '');
  const [zipCode, setZipCode] = useState(profile?.zipCode || '');

  // Emergency contact form state
  const [contactName, setContactName] = useState('');
  const [contactRelationship, setContactRelationship] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome completo');
      return;
    }

    try {
      await updateProfile({
        fullName,
        dateOfBirth,
        bloodType,
        allergies,
        medicalConditions,
        phone,
        email,
        address,
        city,
        state,
        zipCode,
      });
      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar perfil');
    }
  };

  const handleAddContact = async () => {
    if (!contactName.trim() || !contactPhone.trim()) {
      Alert.alert('Erro', 'Por favor, preencha nome e telefone do contato');
      return;
    }

    try {
      await addEmergencyContact({
        name: contactName,
        relationship: contactRelationship,
        phone: contactPhone,
        email: contactEmail || undefined,
      });
      setContactName('');
      setContactRelationship('');
      setContactPhone('');
      setContactEmail('');
      setShowAddContact(false);
      Alert.alert('Sucesso', 'Contato de emergência adicionado');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar contato');
    }
  };

  const handleDeleteContact = (contactId: string) => {
    Alert.alert('Confirmar', 'Deseja remover este contato de emergência?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteEmergencyContact(contactId);
            Alert.alert('Sucesso', 'Contato removido');
          } catch (error) {
            Alert.alert('Erro', 'Falha ao remover contato');
          }
        },
      },
    ]);
  };

  if (!profile) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Carregando perfil...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        {/* Header */}
        <View className="bg-primary p-6 pb-8">
          <Text className="text-3xl font-bold text-background mb-2">{profile.fullName || 'Meu Perfil'}</Text>
          <Text className="text-background opacity-80">Informações pessoais e contatos</Text>
        </View>

        <View className="p-4 gap-6">
          {/* Personal Information Section */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-foreground">Informações Pessoais</Text>
              <Pressable
                onPress={() => setIsEditing(!isEditing)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-primary font-semibold">{isEditing ? 'Cancelar' : 'Editar'}</Text>
              </Pressable>
            </View>

            {isEditing ? (
              <View className="gap-4">
                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Nome Completo *</Text>
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Seu nome completo"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Data de Nascimento</Text>
                  <TextInput
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                    placeholder="YYYY-MM-DD"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View className="flex-row gap-2">
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground mb-1">Tipo Sanguíneo</Text>
                    <TextInput
                      value={bloodType}
                      onChangeText={setBloodType}
                      placeholder="O+, A-, etc"
                      className="border border-border rounded-lg p-3 text-foreground"
                      placeholderTextColor={colors.muted}
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Alergias</Text>
                  <TextInput
                    value={allergies}
                    onChangeText={setAllergies}
                    placeholder="Descreva suas alergias"
                    multiline
                    numberOfLines={3}
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Condições Médicas</Text>
                  <TextInput
                    value={medicalConditions}
                    onChangeText={setMedicalConditions}
                    placeholder="Descreva suas condições médicas"
                    multiline
                    numberOfLines={3}
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Telefone</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="(11) 99999-9999"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="seu@email.com"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Endereço</Text>
                  <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Rua, número, complemento"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View className="flex-row gap-2">
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground mb-1">Cidade</Text>
                    <TextInput
                      value={city}
                      onChangeText={setCity}
                      placeholder="Cidade"
                      className="border border-border rounded-lg p-3 text-foreground"
                      placeholderTextColor={colors.muted}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground mb-1">Estado</Text>
                    <TextInput
                      value={state}
                      onChangeText={setState}
                      placeholder="SP"
                      className="border border-border rounded-lg p-3 text-foreground"
                      placeholderTextColor={colors.muted}
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">CEP</Text>
                  <TextInput
                    value={zipCode}
                    onChangeText={setZipCode}
                    placeholder="00000-000"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <Pressable
                  onPress={handleSaveProfile}
                  style={({ pressed }) => [
                    { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
                    { paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
                  ]}
                >
                  <Text className="text-background font-bold text-base">Salvar Alterações</Text>
                </Pressable>
              </View>
            ) : (
              <View className="gap-3">
                {fullName && (
                  <View>
                    <Text className="text-xs font-semibold text-muted">Nome Completo</Text>
                    <Text className="text-foreground">{fullName}</Text>
                  </View>
                )}
                {dateOfBirth && (
                  <View>
                    <Text className="text-xs font-semibold text-muted">Data de Nascimento</Text>
                    <Text className="text-foreground">{dateOfBirth}</Text>
                  </View>
                )}
                {bloodType && (
                  <View>
                    <Text className="text-xs font-semibold text-muted">Tipo Sanguíneo</Text>
                    <Text className="text-foreground">{bloodType}</Text>
                  </View>
                )}
                {allergies && (
                  <View>
                    <Text className="text-xs font-semibold text-muted">Alergias</Text>
                    <Text className="text-foreground">{allergies}</Text>
                  </View>
                )}
                {medicalConditions && (
                  <View>
                    <Text className="text-xs font-semibold text-muted">Condições Médicas</Text>
                    <Text className="text-foreground">{medicalConditions}</Text>
                  </View>
                )}
                {phone && (
                  <View>
                    <Text className="text-xs font-semibold text-muted">Telefone</Text>
                    <Text className="text-foreground">{phone}</Text>
                  </View>
                )}
                {email && (
                  <View>
                    <Text className="text-xs font-semibold text-muted">Email</Text>
                    <Text className="text-foreground">{email}</Text>
                  </View>
                )}
                {address && (
                  <View>
                    <Text className="text-xs font-semibold text-muted">Endereço</Text>
                    <Text className="text-foreground">{address}</Text>
                    {(city || state) && <Text className="text-foreground">{city}, {state}</Text>}
                    {zipCode && <Text className="text-foreground">{zipCode}</Text>}
                  </View>
                )}
                {!fullName && (
                  <Text className="text-muted text-center py-4">Nenhuma informação pessoal preenchida</Text>
                )}
              </View>
            )}
          </View>

          {/* Emergency Contacts Section */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-foreground">Contatos de Emergência</Text>
              <Pressable
                onPress={() => setShowAddContact(!showAddContact)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-primary font-semibold">{showAddContact ? 'Cancelar' : '+ Adicionar'}</Text>
              </Pressable>
            </View>

            {showAddContact && (
              <View className="gap-4 mb-4 pb-4 border-b border-border">
                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Nome *</Text>
                  <TextInput
                    value={contactName}
                    onChangeText={setContactName}
                    placeholder="Nome do contato"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Relacionamento</Text>
                  <TextInput
                    value={contactRelationship}
                    onChangeText={setContactRelationship}
                    placeholder="Mãe, Pai, Cônjuge, etc"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Telefone *</Text>
                  <TextInput
                    value={contactPhone}
                    onChangeText={setContactPhone}
                    placeholder="(11) 99999-9999"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-foreground mb-1">Email</Text>
                  <TextInput
                    value={contactEmail}
                    onChangeText={setContactEmail}
                    placeholder="email@example.com"
                    className="border border-border rounded-lg p-3 text-foreground"
                    placeholderTextColor={colors.muted}
                  />
                </View>

                <Pressable
                  onPress={handleAddContact}
                  style={({ pressed }) => [
                    { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
                    { paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
                  ]}
                >
                  <Text className="text-background font-bold text-base">Adicionar Contato</Text>
                </Pressable>
              </View>
            )}

            {profile.emergencyContacts.length > 0 ? (
              <View className="gap-3">
                {profile.emergencyContacts.map((contact) => (
                  <View key={contact.id} className="bg-background rounded-lg p-3 border border-border">
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-foreground">{contact.name}</Text>
                        {contact.relationship && (
                          <Text className="text-sm text-muted">{contact.relationship}</Text>
                        )}
                      </View>
                      <Pressable
                        onPress={() => handleDeleteContact(contact.id)}
                        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                      >
                        <Text className="text-error font-semibold">Remover</Text>
                      </Pressable>
                    </View>
                    <Text className="text-sm text-foreground mb-1">📞 {contact.phone}</Text>
                    {contact.email && <Text className="text-sm text-foreground">✉️ {contact.email}</Text>}
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-muted text-center py-4">Nenhum contato de emergência adicionado</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

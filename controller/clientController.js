
import Client from "../models/userClient.js";

function generateIdentifiant() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let identifiant = '';
    for (let i = 0; i < 5; i++) {
        identifiant += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return identifiant;
}

export async function createClient(req, res) {
    const { name, email, phone, address } = req.body;
    const identifiant = generateIdentifiant();

    try {
        const client = new Client({ identifiant, name, email, phone, address });
        await client.save();
        res.status(201).json({ message: 'Client created successfully', client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


export async function updateClient(req, res) {
    const { id } = req.params;
    const { identifiant, name, email, phone, address } = req.body;

    try {
        let client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        client.identifiant = identifiant || client.identifiant;
        client.name = name || client.name;
        client.email = email || client.email;
        client.phone = phone || client.phone;
        client.address = address || client.address;

        await client.save();
        res.status(200).json({ message: 'Client updated successfully', client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


export async function deleteClient(req, res) {
    const { id } = req.params;

    try {
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        await Client.findByIdAndDelete(id);
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export async function getAllClients (req, res) {
    try {
        const clients = await Client.find(); 
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};